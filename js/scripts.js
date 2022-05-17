const slideshow = (() => {
	let currSlide = 1
	
})()

const displayController = (() => {
	const printProjects = ["objects", "england", "protest", "pattern", "selling", "behind", "vinyl", "taste", "masterpiece", "speakUp"];
	const typeProjects = ["melt", "corona", "millstone", "meccano"];

	const displayProjects = (project) => {
		document.getElementById(`${project}`).classList.toggle("display-none")
	}

	document.querySelectorAll("checkbox").forEach(checkbox => checkbox.addEventListener("change", e => {
		console.log("checked")
		if (e.target.id === "print"){
			console.log("print")
			for (project of printProjects) {
				displayProjects(project);
			}
		} else if (e.target.id === "type") {
			console.log("type")
			for (project of typeProjects) {
				displayProjects(project);
			}
		}
	}))
})()