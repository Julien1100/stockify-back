import User from "../models/userModel";

/*
TODO:
- create, get all, get one, modify, delete
*/

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

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Vérification que l'utilisateur n'existe pas déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Cet e-mail est déjà utilisé");
    }

    // Création de l'utilisateur
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    // Sauvegarde de l'utilisateur
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé", user: newUser });
  } catch (error) {
    res.status(500).send("Erreur lors de la requête");
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

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
    const deletedUser = User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(400).send("Utilisateur introuvable");
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send("Erreur lors de la requête");
  }
};

export { getAllUsers, getOneUser, createUser, updateUser, deleteUser };
