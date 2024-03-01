import { generateAuthToken } from "../middlewares/auth";
import User from "../models/userModel";

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Vérification que l'utilisateur n'existe pas déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Cet e-mail est déjà utilisé");
    }

    // Encryptage du password
    const hashedPassword = await User.encrypt(password); // Utilisation de la méthode statique

    // Création de l'utilisateur
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

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
    const { role } = req.user;

    if (role === "admin") {
      res.send(allUsers);
    } else {
      res.status(401).send("Non autorisé");
    }
  } catch (error) {
    res.status(500).send("Erreur lors de la requête");
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const { role, id } = req.user;

    if (!user) {
      return res.status(404).send("Utilisateur introuvable");
    }

    if (role === "admin" || id === userId) {
      res.send(user);
    } else {
      res.status(401).send("Non autorisé");
    }
  } catch (error) {
    res.status(500).send("Erreur lors de la requête");
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;
    const { role } = req.body;

    // Vérification si le rôle est modifié et si il est valide
    if (role && !["admin", "moderator", "user"].includes(role)) {
      return res.status(400).send("Rôle invalide");
    }

    // Vérification et encryption du nouveau mot de passe s'il est présent dans les données de mise à jour
    if (updateData.password) {
      console.log(`1 - ${updateData.password}`);
      updateData.password = await User.encrypt(updateData.password);
      console.log(`2 - ${updateData.password}`);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      res.status(400).send("Utilisateur introuvable");
    }

    res.send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur lors de la requête");
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    const { role, id } = req.user;

    if (!deletedUser) {
      return res.status(404).send("Utilisateur introuvable");
    }

    if (role === "admin" || id === userId) {
      res.status(204).send();
    } else {
      res.status(401).send("Non autorisé");
    }
  } catch (error) {
    res.status(500).send("Erreur lors de la requête");
  }
};

export { getAllUsers, getOneUser, register, login, updateUser, deleteUser };
