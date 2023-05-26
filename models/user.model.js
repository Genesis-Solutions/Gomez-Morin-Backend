import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

/**
 * A Mongoose schema representing a user account.
 */
const UserSchema = new mongoose.Schema({
  /**
   * The user's username. Must be unique and have a maximum length of 15 characters.
   */
  userName: {
    type: String,
    required: true,
    unique: true,
    maxlength: 15,
  },
  /**
   * Indicates whether the user account is currently blocked.
   */
  isBlocked: {
    type: Boolean,
  },
  /**
   * The date and time when the user account was blocked, if applicable.
   */
  blockedDate: {
    type: Date,
  },
  /**
   * The number of unsuccessful login attempts made by the user.
   */
  tryNum: {
    type: Number,
  },
  /**
   * The ID of the user's role in the system.
   */
  ptrRol: {
    type: Schema.Types.ObjectId,
    ref: "roles",
  },
  /**
   * The user's email address. Must be unique and match the format of a valid email address.
   */
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  /**
   * The user's password. Must meet the following requirements:
   * - Be at least 8 characters long
   * - Be no more than 15 characters long
   * - Contain at least one uppercase letter
   * - Contain at least one lowercase letter
   * - Contain at least one number
   * - Contain at least one special character from the following set: !@#$%^&*()_+}{":;?/>.<,|=-
   */
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,|=-])[a-zA-Z\d!@#$%^&*()_+}{"':;?/>.<,|=-]{8,15}$/.test(
          v
        );
      },
      message: () =>
        `The password must be at least 8 characters long, no more than 15 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character from the following set: !@#$%^&*()_+}{":;?/>.<,|=-`,
    },
  },
});

/**
 * A pre-save hook that hashes the user's password before saving it to the database.
 * 
 * @param {function} next - The callback function to be called after the hook completes.
 * @returns {void}
 */
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
