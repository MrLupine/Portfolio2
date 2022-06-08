const displayController = (() => {
	const projectDisplay = {
		print: [],
		printVisible: [],
		type: [],
		typeVisible: [],
		intervalRunning: false,
		togglePrintProjects: "",
		toggleTypeProjects: ""
	};

	let modalVisible = true;
	let visibleProject = "";
	let currSlide = 1;
	let currSlideCount = 0;
	const gallery = document.getElementById("image-gallery");
	const slideshowTimer = setInterval(function() {slideshowChanger("timer")}, 3000);
	let slideshowRunning = false;

	const toggleGallery = () => {
		document.getElementById("text").classList.toggle("transform-z");
		document.getElementById("projects").classList.toggle("transform-z");
		document.getElementById("modal").classList.toggle("hidden");
		document.getElementById("logo").classList.toggle("logo-hover");
		modalVisible = !modalVisible;
	}

	const currSlideCalculator = () => {
		gallery.classList.add('notransition');
		gallery.style.transform = `translate(-${currSlide * 100}vw)`;
		gallery.offsetHeight
		gallery.classList.remove('notransition');
		gallery.removeEventListener("transitionend", currSlideCalculator);
	}

	const slideshowChanger = e => {
		if (e.target.id === logo) {
			return
		} else if (e.clientX > window.innerWidth / 2 || e.code === "ArrowRight") {
			currSlide += 1
			gallery.style.transform = `translate(-${currSlide * 100}vw)`
			if (currSlide === currSlideCount - 1) {
				currSlide = 1
				gallery.addEventListener("transitionend", currSlideCalculator)
			}
		} else if (e.clientX < window.innerWidth / 2 || e.code === "ArrowLeft") {
			currSlide -= 1
			gallery.style.transform = `translate(-${currSlide * 100}vw)`
			if (currSlide === 0) {
				currSlide = currSlideCount - 2
				gallery.addEventListener("transitionend", currSlideCalculator)
			}
		} else if (e.code === "Space") {
			slideShowRunning ? clearInterval(slideshowTimer) : slideshowTimer;
		}
	}

	const reverseModal = () => {
		toggleGallery()
		setTimeout(function() {document.getElementById(`gallery-${visibleProject}`).classList.toggle("display-none")}, 500);
		document.getElementById("logo").removeEventListener("click", reverseModal);
	}

	document.querySelectorAll(".print").forEach(project => projectDisplay["print"].push(project.id))
	document.querySelectorAll(".type").forEach(project => projectDisplay["type"].push(project.id))
	document.querySelectorAll(".projects_group").forEach(project => project.addEventListener("click", e => {
		visibleProject = e.currentTarget.id
		currSlideCount = document.getElementById(`gallery-${visibleProject}`).childElementCount
		gallery.style.width = `${currSlideCount * 100}vw`
		document.getElementById(`gallery-${visibleProject}`).classList.toggle("display-none");
		toggleGallery()
		document.getElementById("logo").addEventListener("click", reverseModal);
		document.body.addEventListener("click", slideshowChanger);
		document.addEventListener("keydown", slideshowChanger);
		setInterval(function() {slideshowChanger(timer)}, 200)
		slideshowTimer
		e.stopPropagation();
	}))

	document.querySelectorAll(".checkbox").forEach(checkbox => checkbox.addEventListener("change", e => {
		const category = e.target.id;
		const categoryVisible = document.getElementById(`${category}`).checked;
		const arr = projectDisplay[category];
		const projectArr = projectDisplay[`${category}`]
		const projectArrVisible = projectDisplay[`${category}Visible`]
		const fadeIn = x => {
			x.classList.toggle("display-none")
			setTimeout(function () {x.classList.toggle("hidden")}, 20);
		}

		const fadeOut = x => {
			x.classList.toggle("hidden")
			x.addEventListener("transitionend", () => {
				x.classList.toggle("display-none");
			}, { 
				capture: false,
  				once: true,
  				passive: false
  			});
		}

		const projectSelector = (minus, plus) => {
			const currProject = minus.pop();
			const currID = document.getElementById(`${currProject}`)
			plus.push(currProject);
			categoryVisible ? fadeIn(currID) : fadeOut(currID);
		}

		const clearToggle = () => {
			clearInterval(projectDisplay[`toggle${category}Projects`]);
			projectDisplay.intervalRunning = false;
		}

		if (projectDisplay.intervalRunning) {clearToggle()}
		
		projectDisplay[`toggle${category}Projects`] = setInterval(function(){
			projectDisplay.intervalRunning = true;
			if (categoryVisible) {
				if (projectArr.length <= 0) {
					clearToggle()
				}

				if (projectDisplay.intervalRunning){
					projectSelector(projectArr, projectArrVisible)
				}

			} else {
				if (projectArrVisible.length <= 0) {
					clearToggle()
				}

				if (projectDisplay.intervalRunning){
					projectSelector(projectArrVisible, projectArr)
				}
			}
		}, 100)	
		projectDisplay[`toggle${category}Projects`];
	}))
})()