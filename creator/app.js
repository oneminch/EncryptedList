const tag_checkbox = document.querySelector(".tags");
const category_checkbox = document.querySelector(".categories");

const product_name = document.querySelector(".name");
const product_desc = document.querySelector(".desc");
const product_url = document.querySelector(".url");
const product_img = document.querySelector(".img_url");
const product_img_name = product_img.querySelector(".filename");
const product_img_type = product_img.querySelector(".image-type");

const submit = document.querySelector(".submit");
const output = document.querySelector(".output");
const commit_output = document.querySelector(".commit-msg");

// List of available tags
const tag_list = [
	"beta",
	"free",
	"opt-in",
	"web-app",
	"premium",
	"freemium",
	"proprietary",
	"open-source",
	"decentralized",
	"cross-platform" //, "", "", "", "", ""
];
// List of available categories
const catergory_list = [
	"Email",
	"Notes",
	"Health",
	"Storage",
	"Finance",
	"Security",
	"Utilities",
	"Productivity",
	"File Transfer",
	"Collaboration",
	"Communication"
];

let items_list = []; // items to be added list
let commit_msg = ``; // commit message

const renderOptions = (checkbox_type, checkbox_type_parent) => {
	let checkbox_markup = ``;
	let checkbox_list_type = checkbox_type_parent.classList.item(1);
	checkbox_markup += `
      <h3>
         ${checkbox_list_type[0].toUpperCase()}${checkbox_list_type.slice(1)}
      </h3>
   `;
	let checkbox_id;
	for (let i = 0; i < checkbox_type.length; i++) {
		let val = checkbox_type[i];
		checkbox_id = val.split(" ")[0];
		checkbox_markup += `
         <div>
            <input type="checkbox" id=${checkbox_id} value=${val
			.split(" ")
			.join("-")}>
            <label for=${checkbox_id}>
               ${val}
            </label>
         </div>
      `;
	}
	checkbox_type_parent.insertAdjacentHTML("afterbegin", checkbox_markup);
};

renderOptions(tag_list, tag_checkbox);
renderOptions(catergory_list, category_checkbox);

// Add product with details
const t_nodes = tag_checkbox.querySelectorAll("[type=checkbox]");
const c_nodes = category_checkbox.querySelectorAll("[type=checkbox]");

submit.addEventListener("click", () => {
	let c = ["All"],
		t = ["all"];

	let n = product_name.value; // Get product name
	let d = product_desc.value; // Get product description
	let u = product_url.value; // Get product url
	let i = `./assets/img/`; //Get product image url
	i += `${product_img_name.value}.${
		product_img_type[product_img_type.selectedIndex].value
	}`;

	items_list.push(n); // Add item name to commit items list

	// Get tag values
	for (let i = 0; i < t_nodes.length; i++) {
		if (t_nodes[i].checked) {
			t.push(t_nodes[i].value);
		}
	}
	// Get category values
	for (let i = 0; i < c_nodes.length; i++) {
		if (c_nodes[i].checked) {
			c.push(c_nodes[i].value.split("-").join(" "));
		}
	}

	let product_markup = `
   {
      name: "${n}",
      description: "${d}",
      url: "${u}",
      img_url: "${i}",
      category: ${JSON.stringify(c)},
      tags: ${JSON.stringify(t)}
   },<br/>`;

	commit_msg = `Added ${items_list.length} new ${
		items_list.length === 1 ? `entry` : `entries`
	}: ${items_list.join(", ")}`;
	commit_output.innerHTML = commit_msg;

	output.insertAdjacentHTML("beforeend", product_markup);
});
