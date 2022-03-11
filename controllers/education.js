import Edu from "../models/education";

export const education = async (req, res) => {
	const { formFields } = req.body;
	console.log(formFields);
	try {
		formFields.map((f) => {
			let startdate = f.startdate;
			let enddate = f.enddate;
			let education = f.education;
			let areaofinterest = f.areaofinterest;
			let percentage = f.percentage;
			const edu = new Edu({
				startdate,
				enddate,
				education,
				areaofinterest,
				percentage,
				postedBy: req.user._id,
			});
			edu.save();
		});

		res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};
export const geteducation = async (req, res) => {
	const geteducation = await Edu.find({ postedBy: req.user._id });

	res.json(geteducation);
};

export const userEducation = async (req, res) => {
	try {
		const get = await Edu.findById(req.params._id).populate(
			"postedBy",
			"_id name images"
		);
		res.json(get);
	} catch (err) {
		console.log(err);
	}
};

export const updateEducation = async (req, res) => {
	try {
		const data = await Edu.findByIdAndUpdate(req.params._id, req.body, {
			new: true,
		});
		res.json(data);
	} catch (err) {
		console.log(err);
	}
};
export const deleteEducation = async (req, res) => {
	try {
		const data = await Edu.findByIdAndDelete(req.params._id);
		res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};
export const addskill = async (req, res) => {
	try {
		const { values } = req.body;
		// const edu = await Edu.findByIdAndUpdate(
		// 	req.user._id,
		// 	{
		// 		$addToSet: {
		// 			skill: values,
		// 		},
		// 	},
		// 	{ new: true }
		// );
		const edu = await Edu.findOneAndUpdate(
			{ postedBy: req.user._id },
			{
				$addToSet: { skill: values },
			},
			{ new: true }
		);

		res.json(edu);
	} catch (err) {
		console.log(err);
	}
};
