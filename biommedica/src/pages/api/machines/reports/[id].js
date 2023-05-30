import { dbConnect } from '../../../../utils/mongoose';
import Reports from '@/models/report';

dbConnect()

export default async (req, res) => {

	const { query: { id }, method, body } = req;

	switch (method) {
		case "GET":
            console.log(id)
			try {
				const machine = await Reports.find({"machine._id": id})
				if (!machine) return res.status(404).json({ msg: "Machine not found" });
				return res.status(200).json(machine);
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}

		default:
			return res.status(400).json({ msg: "This method is not supported" });
	}

}