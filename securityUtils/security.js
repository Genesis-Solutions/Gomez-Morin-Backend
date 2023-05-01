import path from "path";
import fs from "fs";
import Promise from "promise";
import zlib from "zlib";
import crypto from "crypto";
import AppendInitVect from "./AppendInitVect.js";

/**
* This module provides functionality to encrypt and decrypt files.
*
* @module securityUtils/security
*/

/* CONFIGURACIÓN DE ARCHIVO */
const log = console.log;

/**
* Generates a cipher key from the provided password string.
* 
* @param {string} password - The password string to be used to generate the cipher key.
* @returns {Buffer} The cipher key generated from the password string.
*/

function getCipherKey(password) {
    return crypto.createHash("sha256").update(password).digest();
}

/**
* Returns the encrypted filename for a given filename.
* 
* @param {string} fileName - The filename to be encrypted.
* @returns {string} The encrypted filename.
*/

exports.encryptFileName = function(fileName) {
    return `${fileName}.enc`
};

/**
* Returns the decrypted filename for a given encrypted filename.
* 
* @param {string} fileName - The encrypted filename.
* @returns {string} The decrypted filename.
*/

exports.decryptFileName = function(fileName) {
    let newFileName = fileName.replace(".enc", "")
    return `des_${newFileName}`
};

/**
* Encrypts the file at the given file path using the provided password and returns a Promise that resolves with a success or error message.
* 
* @param {string} filePath - The path to the file to be encrypted.
* @param {string} originalName - The original filename of the file to be encrypted.
* @param {string} password - The password to be used to encrypt the file.
* @returns {Promise} A Promise that resolves with a success or error message.
*/

exports.encryptFile = function(filePath, originalName, password) {
    return new Promise(function(resolve, reject) {
        // log("Empezando encriptación");
        // log(filePath);
        // log(originalName);
        const initVect = crypto.randomBytes(16);
        // Generate a cipher key from the password.
        const CIPHER_KEY = getCipherKey(password);
        const readStream = fs.createReadStream(filePath + "/" + originalName);
        const gzip = zlib.createDeflate();
        const cipher = crypto.createCipheriv("aes256", CIPHER_KEY, initVect);
        const appendInitVect = new AppendInitVect(initVect);

        // Create a write stream with a different file extension.
        const writeStream = fs.createWriteStream(
            path.join(filePath + "/" + originalName + ".enc")
        );
        // log("Previo encriptación");
        readStream
            .pipe(gzip)
            .pipe(cipher)
            .pipe(appendInitVect)
            .pipe(writeStream)
            .on("finish", () => {
                ////log('All writes are now complete.');
                // log("Finalizando encriptación");
                fs.access(filePath + "/" + originalName, fs.F_OK, (err) => {
                    if (err) {
                        console.error(err);
                        resolve({ type: "ENCRYPT", msg: "ERROR", error: err });
                    }

                    fs.unlink(filePath + "/" + originalName, (err) => {
                        if (err) {
                            console.error(err);
                            resolve({ type: "ENCRYPT", msg: "ERROR", error: err });
                        }

                        //const fileName = path.join(filePath+"/"+originalName + ".enc")
                        resolve({ type: "ENCRYPT", msg: "OK", error: null });
                    });
                });
            });
    });
};

/**
* Decrypts the file at the given file path using the provided password and returns a Promise that resolves with a success or error message.
* 
* @param {string} filePath - The path to the file to be decrypted.
* @param {string} originalName - The original filename of the file to be decrypted.
* @param {string} password - The password to be used to decrypt the file.
* @returns {Promise} A Promise that resolves with a success or error message.
*/

exports.decryptFile = function(filePath, originalName, password) {
    return new Promise(function(resolve, reject) {
        log("Empezando des encriptación");
        // log(filePath);
        // log(originalName);
        // log(filePath + originalName);

        const readInitVect = fs.createReadStream(filePath + originalName, {
            end: 15,
        });

        let initVect;

        readInitVect.on("data", (chunk) => {
            initVect = chunk;
        });

        // Once we’ve got the initialization vector, we can decrypt the file.

        readInitVect.on("close", () => {
            log("Done reading vector");

            const cipherKey = getCipherKey(password);

            const readStream = fs.createReadStream(filePath + "/" + originalName, {
                start: 16,
            });

            const decipher = crypto.createDecipheriv("aes256", cipherKey, initVect);

            const unzip = zlib.Inflate();

            const writeStream = fs.createWriteStream(
                filePath + "/des_" + originalName.replace(".enc", "")
            );

            readStream
                .pipe(decipher)
                .pipe(unzip)
                .pipe(writeStream)
                .on("finish", () => {
                    ////log('All writes are now complete.');

                    //log("Finalizando des encriptación")

                    fs.unlink(filePath + "/" + originalName, (err) => {
                        if (err) {
                            console.error(err);

                            resolve({ type: "ENCRYPT", msg: "ERROR", error: err });
                        }

                        resolve({ type: "ENCRYPT", msg: "OK", error: null });
                    });

                    resolve({ type: "ENCRYPT", msg: "OK", error: null });
                });
        });
    });
};