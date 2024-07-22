import { Schema, model, Document, Types } from 'mongoose';

interface INote extends Document {
  user: Types.ObjectId;
  title: string;
  description: string;
  createdAt: Date;
}

const noteSchema = new Schema<INote>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Note = model<INote>('Note', noteSchema);
export default Note;
