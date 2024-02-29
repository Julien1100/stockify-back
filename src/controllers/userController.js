import { generateAuthToken } from "../middlewares/auth";
import User from "../models/userModel";

const register = async (req, res) => {
  try {
    const { email } = req.body;

    // Vérification que l'utilisateur n'existe pas déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Cet e-mail est déjà utilisé");
    }

    // Création de l'utilisateur
    const newUser = await new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.password = await newUser.encrypt(req.body.password);
    newUser.role = req.body.role;

    // Sauvegarde de l'utilisateur
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur lors de la requête");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    const verify = await user.passwordVerification(password, user.password);
    if (!verify) {
      const error = new Error("Mot de passe invalide");
      throw error;
    }
    const token = generateAuthToken(user);

    res.send(`Vous êtes connecté 🥳\n${token}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur lors de la connexion");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (error) {
    res.status(500).send("Erreur lors de la requête");
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("Utilisateur introuvable");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send("Erreur lors de la requête");
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;
    const { role } = req.body;

    // Vérification si le rôle est valide
    if (!["admin", "moderator", "user"].includes(role)) {
      return res.status(400).send("Rôle invalide");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      res.status(400).send("Utilisateur introuvable");
    }

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send("Erreur lors de la requête");
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(400).send("Utilisateur introuvable");
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send("Erreur lors de la requête");
  }
};

export { getAllUsers, getOneUser, register, login, updateUser, deleteUser };
