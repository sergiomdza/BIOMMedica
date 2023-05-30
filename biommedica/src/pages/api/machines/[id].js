import { dbConnect } from '../../../utils/mongoose';
import Machines from '@/models/machine';

dbConnect()

export default async (req, res) => {

	const { query: { id }, method, body } = req;

	switch (method) {
		case "GET":
			try {
				const machine = await Machines.findById(id)
				if (!machine) return res.status(404).json({ msg: "Machine not found" });
				return res.status(200).json(machine);
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}

		case "PUT":
			try {
				try {
					delete body._id;
					delete body.createdAt;
					delete body.updatedAt;
				} catch (error) {
					console.log('Error Cleaning fields:', error)
				}
				
				const { name, location, serial_number, inv_number, brand, model, freq_mant } = JSON.parse(body);
				const machine = await Machines.findOneAndUpdate({ _id: id }, { $set: { name, location, serial_number, inv_number, brand, model, freq_mant  } }, { new: true })
				if (!machine) return res.status(404).json({ msg: "Machine not found" });
				return res.status(200).json(machine);
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}

		case "DELETE":
			try {
				const deletedMachine = await Machines.findByIdAndDelete(id);

				if (!deletedMachine) return res.status(404).json({ msg: "Machine not found" });
				return res.status(200).json(deletedMachine);

			} catch (error) {
				return res.status(500).json({ error: error.message });
			}

		default:
			return res.status(400).json({ msg: "This method is not supported" });
	}

}