let result = document.querySelector(".result"),
  img_result = document.querySelector(".img-result"),
  img_w = document.querySelector(".img-w"),
  img_h = document.querySelector(".img-h"),
  options = document.querySelector(".options"),
  save = document.querySelector(".save"),
  dwn = document.querySelector(".download"),
  upload = document.querySelector("#file-input"),
  cropper = "",
  productsDiv = document.querySelector(".products-container");

// on change show image with crop options
upload.addEventListener("change", (e) => {
  if (e.target.files.length) {
    // start file reader
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target.result) {
        // create new image
        let img = document.createElement("img");
        img.id = "image";
        img.src = e.target.result;
        // clean result before
        result.innerHTML = "";
        // append new image
        result.appendChild(img);
        // show save btn and options
        save.classList.remove("hide");
        options.classList.remove("hide");
        // init cropper
        cropper = new Cropper(img);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

// save on click
save.addEventListener("click", async (e) => {
  e.preventDefault();
  // get result to data uri
  let imgSrc = cropper
    .getCroppedCanvas({
      width: img_w.value, // input value
    })
    .toDataURL();
    // console.log(imgSrc)
    const res = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify({ imgSrc }),
    });
    console.log(res)
    const json = await res.json();
    console.log(json)


  productsDiv.innerHTML = "";
  json.list_img.forEach((product) => {
    let image = document.createElement("img");
    image.width = 200;
    image.height = 200;
    image.src = product["Product Images 1"];
    let name = document.createElement("h3");
    name.innerHTML = product["Product Name"];
    let productElement = document.createElement("div");
    productElement.setAttribute("class", "product-element");
    productElement.appendChild(image);
    productElement.appendChild(name);
    productsDiv.appendChild(productElement);
  });
});
