import * as json_data from "./data";

const disclaimer_btn = document.querySelector(".disclaimer-btn");
const disclaimer_text = document.querySelector(".disclaimer");

const list_type = document.querySelector(".list__type");
const list_container = document.querySelector(".list__container");

const tag_dropdown = document.querySelector(".tags__list");
const category_dropdown = document.querySelector(".category__list");
const dropdown_lists = document.querySelectorAll(".dropdown__list");

// Redirect to new version of site
setTimeout(() => {
	window.location.assign("https://encryptedlist.xyz");
}, 6000);

// 404 Image URL for empty list
const empty_list_img = "./assets/img/404.png";

// Get data values from 'data.js' module
const data_array = json_data.product_list;
const tag_names = json_data.tag_list;
const catergory_names = json_data.catergory_list;

// Load up dropdown values from corresponding arrays
window.addEventListener("load", () => {
	dropdown_lists.forEach((dropdown) => {
		if (dropdown.classList.contains("tags__list")) {
			renderOptions(tag_names, tag_dropdown);
		} else if (dropdown.classList.contains("category__list")) {
			renderOptions(catergory_names, category_dropdown);
		}
	});
	// Render from current value (onload)
	renderFromValue(data_array, selectedValues()[0], selectedValues()[1]);
});

const renderOptions = (dropdown_type, dropdown_type_parent) => {
	let dropdown_markup = ``;
	for (let i = 0; i < dropdown_type.length; i++) {
		let val = dropdown_type[i];
		dropdown_markup += `<option value = "${val}" ${
			val.toLowerCase() == "all" ? "selected" : ""
		}>${val}</option>`;
	}
	dropdown_type_parent.insertAdjacentHTML("afterbegin", dropdown_markup);
};

// Renders values from array to list container
const renderItems = (items_arr) => {
	let markup = ``;
	for (let i = 0; i < items_arr.length; i++) {
		markup += `
         <a target="_blank" rel="noopener" href="${items_arr[i].url}" class="list__item">
            <div class="icon">
               <img src="${items_arr[i].img_url}" alt="${items_arr[i].name} logo">
            </div>
            <div class="info">
               <div class="name">${items_arr[i].name}</div>
               <div class="desc">${items_arr[i].description}</div>
               <div class="tags">`;
		for (let j = 1; j < items_arr[i].tags.length; j++) {
			if (items_arr[i].tags[j] == "opt-in") {
				markup += `<span class="opt-in">#${items_arr[i].tags[j]}</span>`;
			} else {
				markup += `<span>#${items_arr[i].tags[j]}</span>`;
			}
		}
		markup += `</div></div></a>`;
	}
	list_container.innerHTML = "";
	list_container.innerHTML = markup;
	const list_end_markup = `
      <hr class='list__end'>
      <a href="https://github.com/oneminch/encryptedlist" class="github-page" title="How to submit">
      <img src="./assets/img/logo/github.svg" alt="GitHub Page"/>            
      </a>
   `;
	list_container.insertAdjacentHTML("beforeend", list_end_markup);
};

// Renders items from passed array list
// with matching category and tag values
const renderFromValue = (items_list, cat_val, tag_val) => {
	let filterArr = [];

	// Find items with matching cat_val & tag_val
	for (let i = 0; i < items_list.length; i++) {
		if (
			items_list[i].category.includes(cat_val) &&
			items_list[i].tags.includes(tag_val)
		) {
			filterArr.push(items_list[i]);
		}
	}

	// Render
	// 1) results if items match
	// 2) 404 output if no match
	renderItems(filterArr);
	if (filterArr.length > 0) {
		list_type.innerHTML = `${cat_val} (${tag_val})`;
	} else {
		const content_empty = `
         <h2>No products with that specification.</h2>
         <img src=${empty_list_img} alt="Empty List">
      `;
		list_type.innerHTML = "";
		list_container.insertAdjacentHTML("afterbegin", content_empty);
	}
};

// Returns current category and tag values
const selectedValues = () => {
	// Get current category value
	let category_index = category_dropdown.selectedIndex;
	let category_value = category_dropdown.options[category_index].value;

	// Get current tag value
	let tag_index = tag_dropdown.selectedIndex;
	let tag_value = tag_dropdown.options[tag_index].value;

	return [category_value, tag_value];
};

// Render from changed dropdown values
dropdown_lists.forEach((dropdown) =>
	dropdown.addEventListener("change", () => {
		renderFromValue(data_array, selectedValues()[0], selectedValues()[1]);

		if (disclaimer_text.classList.contains("show")) {
			disclaimer_text.classList.remove("show");
			disclaimer_text.classList.add("hide");
		}
	})
);

// Toggle disclaimer text
const toggleDisclaimer = () => {
	if (disclaimer_text.classList.contains("show")) {
		disclaimer_text.classList.remove("show");
		disclaimer_text.classList.add("hide");
	} else {
		disclaimer_text.classList.remove("hide");
		disclaimer_text.classList.add("show");
	}
};
disclaimer_btn.addEventListener("click", toggleDisclaimer);
