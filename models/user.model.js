import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: true,
    limit: 15,
  },
  isBlocked: {
    type: Boolean,
  },
  fechaBloqueo: {
    type: Date,
  },
  numIntentos: {
    type: Number,
  },
  ptrRol: {
    type: Schema.Types.ObjectId,
    ref: "Rol",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} no es un correo electrónico válido.`
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,|=-])[a-zA-Z\d!@#$%^&*()_+}{"':;?/>.<,|=-]{8,15}$/.test(v);
      },
      message: () => `La contraseña debe tener al menos 8 caracteres, máximo 15 caracteres y debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.`
    },
  }
  

});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});


const User = mongoose.model("User", UserSchema);

export default User;
