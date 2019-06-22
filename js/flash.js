

const self = (() =>{

		let $ = (container) =>{
			return document.querySelector(container);
		}

		let al = (container) =>{
			return document.querySelectorAll(container);
		}

		

		let showBtn = $('#show-btn');
		//console.log(showBtn);
		let questionCard = $('.question-card');
		let closeBtn = $('.close-btn');
		let form = $('#question-form');
		let questionInput = $('#question-input');
		let answerInput = $('#answer-input');
		let fedback = $('.feedback');



		showBtn.addEventListener('click',(event)=>{
			questionCard.classList.add('showItem');
		})

		closeBtn.addEventListener('click',(event)=>{
			questionCard.classList.remove('showItem');
		})	

		form.addEventListener('submit',(event)=>{
			let data = [];
			let id = 0;
			event.preventDefault();
			let questionValue = questionInput.value;
			let answerValue = answerInput.value;
			id++;
			//console.log(id);

			questionInput.value = '';
			answerInput.value = '';

			let item = {};

			item.question = questionValue;
			item.answer = answerValue;
			item.id = id;

			data.push(item);
			console.log(data);


			if(questionValue === ''|| answerValue === ''){
				fedback.classList.add('showItem','alert-danger');
				fedback.textContent = 'Can not add empty value';
			}
			setTimeout(()=>{
				fedback.classList.remove('showItem','alert-danger');
			},3000);

			const div = document.createElement("div");
			div.classList.add("col-md-4");
			div.innerHTML = `
			<div class="card card-body flashcard my-3">
	     <h4 class="text-capitalize">${item.question}</h4>
	     <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
	     <h5 class="answer mb-3">${item.answer}</h5>
	     <div class="flashcard-btn d-flex justify-content-between">

	      <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase"
	       data-id="${item.id}">edit</a>
	      <a href="#" id="delete-flashcard" class="
	       btn my-1 delete-flashcard text-uppercase"
	        data-id="${item.id}">delete</a>
	     </div>
	    </div>
			`;

			let cot = $('.contain');
			cot.appendChild(div);

			let qustionList = $('#questions-list');

			qustionList.addEventListener('click',(event)=>{
				event.preventDefault();
				if(event.target.classList.contains("delete-flashcard")){

					let id = event.target.dataset.id;
					qustionList.removeChild(event.target.parentElement.parentElement.
						parentElement);
					// let tempData = data.filter((item)=>{
					// 	return item.id !== parseInt(id); 
					// });
					// data = tempData;
				}
				else if(event.target.classList.contains("show-answer")){
					event.target.nextElementSibling.classList.toggle("showItem");
				}

				else if(event.target.classList.contains("edit-flashcard")){
					let id = event.target.dataset.id;
					console.log(id);
					// qustionList.removeChild(event.target.parentElement.parentElement.
					// 	parentElement);
					let answer = $('.answer');
					answer.classList.add('showItem');
					//event.target.nextElementSibling.classList.toggle("showItem");

					let tempQuestion = data.filter((item)=>{
						return item.id === parseInt(id); 
					});

					let tempData = data.filter((item)=>{
						return item.id !== parseInt(id); 
					});

					data = tempData;
					questionInput.value = tempQuestion[0].question;
					answerInput.value = tempQuestion[0].answer;
				}
			})
		})


})();