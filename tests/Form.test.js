const mongoose = require("mongoose");
import Form from "../models/form.model.js"


// Resto del código de tu prueba


// Resto de tu código de pruebas


describe("Form Model", () => {
  beforeAll(async () => {
    // Configura una conexión de prueba a una base de datos en memoria
    await mongoose.connect("mongodb+srv://ceceqgm:ciS4C5LUZps4QzrG@gomezmorin.hwv9tao.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Cierra la conexión y elimina la base de datos de prueba
    await mongoose.connection.close();
  });

  it("should save a form document correctly", async () => {
    // Crea un documento de prueba
    const form = new Form({
      idForm: new mongoose.Types.ObjectId(),
      userPtr: new mongoose.Types.ObjectId(),
      weekDays: "Lunes, Martes",
      status: "Pending",
      typeEvent: "Conference",
      nameEvent: "My Event",
      targetAudience: "Public",
      startDay: "2023-06-01",
      endDay: "2023-06-02",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      authorities: "Some Authorities",
      cost: 100,
      socialNetwork: "Twitter",
      ineDoc: "INE Document",
      curpDoc: "CURP Document",
      addressDoc: "Address Document",
      extraDoc: "Extra Document",
      membretatedLetterDoc: "Membretated Letter Document",
      requestDate: "2023-05-15",
      nameRequester: "John Doe",
      cellphone: "1234567890",
      telephone: "9876543210",
      email: "test@example.com",
      direction: "Some Direction",
      postalCode: 12345,
      street: "Some Street",
      colony: "Some Colony",
      publicType: "Outdoor",
      chairNumber: 50,
      specificDescription: "Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.",
      assistance: 200,
      ages: "18+",
      requiredSpace: "10x10",
      equipment: "Some Equipment",
      selfEquipment: "Self Equipment",
      softInstallation: "Soft Installation",
      mounting: "Mounting",
      tableNumber: 5,
      folio: "ABC123",
    });

    // Guarda el formulario en la base de datos
    const savedForm = await form.save();

    // Verifica que el formulario se haya guardado correctamente
    expect(savedForm.idForm).toEqual(form.idForm);
    expect(savedForm.userPtr).toEqual(form.userPtr);
    expect(savedForm.weekDays).toEqual(form.weekDays);
    expect(savedForm.status).toBe("Pending");
    expect(savedForm.typeEvent).toBe("Conference");
    expect(savedForm.nameEvent).toBe("My Event");
    expect(savedForm.targetAudience).toBe("Public");
    expect(savedForm.startDay).toBe("2023-06-01");
    expect(savedForm.endDay).toBe("2023-06-02");
    expect(savedForm.startTime).toBe("09:00 AM");
    expect(savedForm.endTime).toBe("05:00 PM");
    expect(savedForm.authorities).toBe("Some Authorities");
    expect(savedForm.cost).toBe(100);
    expect(savedForm.socialNetwork).toBe("Twitter");
    expect(savedForm.ineDoc).toBe("INE Document");
    expect(savedForm.curpDoc).toBe("CURP Document");
    expect(savedForm.addressDoc).toBe("Address Document");
    expect(savedForm.extraDoc).toBe("Extra Document");
    expect(savedForm.membretatedLetterDoc).toBe("Membretated Letter Document");
    expect(savedForm.requestDate).toBe("2023-05-15");
    expect(savedForm.nameRequester).toBe("John Doe");
    expect(savedForm.cellphone).toBe("1234567890");
    expect(savedForm.telephone).toBe("9876543210");
    expect(savedForm.email).toBe("test@example.com");
    expect(savedForm.direction).toBe("Some Direction");
    expect(savedForm.postalCode).toBe(12345);
    expect(savedForm.street).toBe("Some Street");
    expect(savedForm.colony).toBe("Some Colony");
    expect(savedForm.publicType).toBe("Outdoor");
    expect(savedForm.chairNumber).toBe(50);
    expect(savedForm.specificDescription).toBe("Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.Some specific description.");
    expect(savedForm.assistance).toBe(200);
    expect(savedForm.ages).toBe("18+");
    expect(savedForm.requiredSpace).toBe("10x10");
    expect(savedForm.equipment).toBe("Some Equipment");
    expect(savedForm.selfEquipment).toBe("Self Equipment");
    expect(savedForm.softInstallation).toBe("Soft Installation");
    expect(savedForm.mounting).toBe("Mounting");
    expect(savedForm.tableNumber).toBe(5);
    expect(savedForm.folio).toBe("ABC123");
  });

  it("should fail to save a form document with an invalid email", async () => {
    // Crea un documento de prueba con un email inválido
    const form = new Form({
      typeEvent: "Conference",
      nameEvent: "My Event",
      startDay: "2023-06-01",
      endDay: "2023-06-02",
      email: "invalidemail",
    });

    // Intenta guardar el formulario y captura el error
    let error;
    try {
      await form.save();
    } catch (err) {
      error = err;
    }

    // Verifica que el formulario no se haya guardado y que se haya producido un error
    expect(error).toBeDefined();
    expect(error.errors.email.message).toBe("invalidemail is not a valid email address.");
  });
});
