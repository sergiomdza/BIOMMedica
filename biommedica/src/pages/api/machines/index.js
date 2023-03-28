import { dbConnect } from '../../../utils/mongoose';
import Machines from '@/models/machine';

dbConnect()

export default async function handler(req, res) {

  const { method, body } = req;

  switch (method) {
    case "GET":

      try {
        const machines = await Machines.find();
        return res.status(200).json(machines)
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case "POST":
      try {
        const newMachine = new Machines(body);
        const savedMachine = await newMachine.save()
        return res.status(201).json(savedMachine)
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case "PUT":
      try {
        const totalMachines = await Machines.countDocuments({});

        if (!totalMachines) return res.status(404).json({ msg: "No data" });
        return res.status(200).json({count: totalMachines});

      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};