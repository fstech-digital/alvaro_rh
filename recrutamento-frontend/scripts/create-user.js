const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    hashedPassword: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function main() {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("MONGODB_URI não definida");

    await mongoose.connect(MONGODB_URI);
    console.log("🔌 Conectado ao banco!");

    const name = "Admin";
    const email = "admin@example.com";
    const plainPassword = "senha123";
    const role = "admin";

    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    const user = await User.create({
        name,
        email,
        hashedPassword,
        role,
    });

    console.log("✅ Usuário ADMIN criado com sucesso:");
    console.log(user);

    await mongoose.disconnect();
}

main().catch((err) => {
    console.error("❌ Erro ao criar usuário:", err);
    process.exit(1);
});
