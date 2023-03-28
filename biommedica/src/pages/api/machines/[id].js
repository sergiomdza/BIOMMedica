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
				console.log('Actualizado:', body)
				try {
					delete body._id;
					delete body.createdAt;
					delete body.updatedAt;
					console.log('borramos:', body)
				} catch (error) {
					
				}
				const machine = await Machines.findByIdAndUpdate(id, body, { new: true })
				if (!machine) return res.status(404).json({ msg: "Machine not found" });
				console.log('Actualizado:', machine)
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