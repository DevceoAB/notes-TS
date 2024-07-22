// src/controllers/noteController.ts
import { Request, Response } from 'express';
import Note from '../models/Note';
import { CustomRequest } from '../types/custom';

export const createNote = async (req: CustomRequest, res: Response) => {
  const { title, description } = req.body;
  try {
    const note = new Note({
      user: req.userId,
      title,
      description,
    });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const getNotes = async (req: CustomRequest, res: Response) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
