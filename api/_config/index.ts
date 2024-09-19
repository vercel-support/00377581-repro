import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const environmentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },

    minAppVersion: {
      type: String,
      default: '',
    },

    isMaintenance: {
      type: Boolean,
      default: false,
    },

    isAppMaintenance: {
      type: Boolean,
      default: false,
    },

    maintenanceInfo: {
      type: Object,
      default: null,
    },

    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

environmentSchema.set('toJSON', {
  virtuals: true,
  transform: (_, converted) => {
    delete converted._id;
    delete converted.team;
  },
});

export default mongoose.model('setting_environment', environmentSchema);
