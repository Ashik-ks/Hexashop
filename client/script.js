
async function Getdata(){
     let response = await fetch(`/submit`);
     console.log("response : ",response);

     let parsed_response = await response.json();
        console.log("display : ", parsed_response);

     let message = parsed_response.message;
     console.log("message : ",message);


     let datacontainer = document.getElementById('datacontainer');
     let datacontainer1 = document.getElementById('datacontainer1');
     let datacontainer2 = document.getElementById('datacontainer2');
     let datacontainer3 = document.getElementById('datacontainer3');

     let rows = ''
     let rows1 = ''
     let rows2 = ''
     let rows3 = ''

     let arr = ['']
     let arr1 = ['']
     let arr2 =['']
     let arr3 = ['']
     let arr4 = ["Women's clothing", "Men's clothing","Kid's Clothing"]
     

  

     for(i=0;i<message.length; i++){
        let id = message[i]._id
        if(message[i].category === "Men's clothing"){
            arr = 
            rows = rows + ` 
                
          <div class="container lh-lg pb-3 pt-3 shadow-none mb-5 bg-light rounded" onclick="handleClick('${id}')">
                     <div id = "imageid"><img src ="${message[i].image} " class = "datacontainerimg"></div>
                      <div class = "d-flex justify-content-between">
                      <div id = "titleid" class =" fs-4 fw-bold  d-inline mt-1">${message[i].name}</div>
                      <div id = "titleid" class =" fs-5 fw-bold d-inline mt-2">${message[i].price}</div>
                      </div>
                       
                     </div>
            `
        }
        if(message[i].category === "Women's clothing"){
            arr1 = 
            rows1 = rows1 + ` 
                
          <div class="container lh-lg pb-3 pt-3 shadow-none mb-5 bg-light rounded" onclick="handleClick('${id}')">
                     <div id = "imageid"><img src ="${message[i].image} " class = "datacontainerimg"></div>
                      <div class = "d-flex justify-content-between">
                      <div id = "titleid" class =" fs-4 fw-bold  d-inline mt-1">${message[i].name}</div>
                      <div id = "titleid" class =" fs-5 fw-bold d-inline mt-2">${message[i].price}</div>
                      </div>
                       
                     </div>
            `
        }
        if(message[i].category === "Kid's Clothing"){
            arr2 = 
            rows2 = rows2 + ` 
                
          <div class="container lh-lg pb-3 pt-3 shadow-none mb-5 bg-light rounded" onclick="handleClick('${id}')">
                     <div id = "imageid"><img src ="${message[i].image} " class = "datacontainerimg"></div>
                      <div class = "d-flex justify-content-between">
                      <div id = "titleid" class =" fs-4 fw-bold  d-inline mt-1">${message[i].name}</div>
                      <div id = "titleid" class =" fs-5 fw-bold d-inline mt-2">${message[i].price}</div>
                      </div>
                       
                     </div>
            `
        }
       
       

        datacontainer.innerHTML = rows;
        datacontainer1.innerHTML = rows1;
        datacontainer2.innerHTML = rows2;
       
        }

        for (let i = 0; i < message.length; i++) {
            let item = message[i];
            if (!arr4.includes(item.category)) {
                rows3 += `
                    <div class="container lh-lg pb-3 pt-3 shadow-none mb-5 bg-light rounded" onclick="handleClick('${item._id}')">
                        <div id="imageid"><img src="${item.image}" class="datacontainerimg"></div>
                        <div class="d-flex justify-content-between">
                            <div id="titleid" class="fs-4 fw-bold d-inline mt-1">${item.name}</div>
                            <div id="titleid" class="fs-5 fw-bold d-inline mt-2">${item.price}</div>
                        </div>
                    </div>
                `;
            }
        }
            datacontainer3.innerHTML = rows3;
        
        
}

async function addData(event){
     window.location.href = `index.html`
    event.preventDefault();

    let name = document.getElementById('name').value ;
    console.log("name : ",name);

    let price = document.getElementById('price').value ;
    console.log("price : ",price);

    let category = document.getElementById('category').value ;
    console.log("category : ",category);

    let image = document.getElementById('image').value ;
    console.log("image : ",image);
 
    let description = document.getElementById('description').value  ;
    console.log("description : ",description);

    let rating = document.getElementById('rating').value ;
    console.log("rating : ",rating);
    
   

    let datas = {
        name,
        price,
        image,
        description,
        rating,
        category,
    }

    let json_data = JSON.stringify(datas)
    console.log("json_data : ", json_data);

    let response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: json_data,
    });
    console.log("response : ", response);

    let parsed_response = await response.text();
    console.log("parsed_response : ", parsed_response)

    if (parsed_response) {
        alert(parsed_response);
        return;
    } else {
        alert("something went wrong");
    }
}

function handleClick(id) {
    window.location.href = `singleview.html?id=${id}`;
    console.log("id : ", id)
}

async function viewdata(){

    let location = window.location;
    console.log("location", location);

    let querystring = location.search;
    console.log("querystring", querystring);

    let urlParams = new URLSearchParams(querystring);
    console.log("url", urlParams);

    let id = urlParams.get("id");
    console.log("id ", id, typeof (id));

    try {

        let response = await fetch(`/product/${id}`);
        console.log("response : ",response);

        let parsed_response = await response.json();
        console.log("parsed_ersponse : ",parsed_response)

        let message = parsed_response.message;
        console.log("message : ",message);
        console.log("message.category : ",message.category)

        let rows = `
        <div class="container  lh-lg  pb-3 pt-3 shadow p-3 mb-5 bg-body rounded mt-3 mt-5">
          <div id = "imageid1" class="text-center" ><img  src ="${message.image} "class = "single_datacontainerimg"></div>
                     <div id = "titleid1" class = "mt-3 fw-bold fs-1">Product : ${message.name}</div>
                     <div id = "categoryid1" class="fst-normal fs-3">Price : ${message.price}</div>
                     <div id = "ratingid1" class="fst-normal fs-3">Category : ${message.category}</div>
                     <div id = "ratingid1" class="fst-normal fs-3">Rating : ${message.rating} &#9734</div>
                     <div id = "ratingid1" class="fst-normal fs-3">Description : ${message.description}</div>
                     </div>
           </div>
        `
        document.getElementById('single_datacontainer').innerHTML = rows;

        let response1 = await fetch(`/submit`);
     console.log("response1 : ",response1);

     let parsed_response1 = await response1.json();
        console.log("parsed_response1 : ", parsed_response1);

     let message1 = parsed_response1.message;
     console.log("message1 : ",message1);
    //  console.log("message1.category : ",message1.category)

    let rows1 = ''
    let single_datacontainer1 = document.getElementById('single_datacontainer1');
     for(i=0;i<message1.length; i++){
        if(message1[i].category === message.category){
             rows1 = rows1 + ` 
                 
           <div class="container lh-lg pb-3 pt-3 shadow-none mb-5 bg-light rounded border " onclick="handleClick1('${id}')">
                      <div id = "imageid"><img src ="${message1[i].image} " class = "datacontainerimg"></div>
                       <div class = "d-flex justify-content-between">
                       <div id = "titleid" class =" fs-4 fw-bold  d-inline mt-1">${message1[i].name}</div>
                       <div id = "titleid" class =" fs-5 fw-bold d-inline mt-2">${message1[i].price}</div>
                       </div>
                        
                      </div>
             `
         }
    
         single_datacontainer1.innerHTML = rows1;
     }
     




    } catch (error) {
        console.log("error : ",error)
    }
}

async function UpdateData(){

    let response = await fetch(`/submit`);
console.log("response : ",response);

let parsed_response = await response.json();
   console.log("display : ", parsed_response);

let message = parsed_response.message;
console.log("message : ",message);

let datacontainer =  document.getElementById('datacontainer_update');
console.log("datacontainer : ",datacontainer);

let rows = [''];

for (i=0;i<message.length;i++){
    let id = message[i]._id;
    rows = rows + `
    <div class="row-12 bg-secondary d-flex  pb-3 pt-3 shadow-none mb-5 bg-light rounded" onclick="handleClick1('${id}')">
            <div class="col-2" ><img src="${message[i].image} " class="datacontainerimgupdate"></div>
            <div class="col-6  fs-4 fw-bold   mt-1 text-center text-secondary  pt-2">${message[i].name}</div>
            <div class="col-2  fs-5 fw-bold  mt-2 text-center text-secondary pt-2">${message[i].category}&#9734</div>
            <div class="col-2 mt-3 text-center "><img src="./images/icons8-delete-30.png" class="datacontainerimgdelete" onclick="DeleteClick('${id}')"></div>
       </div>
        
            `
     datacontainer.innerHTML= rows;
}
}

function handleClick1(id) {
    window.location.href = `adminpage.html?id=${id}`;
    console.log("id : ", id)
}

async function viewData1(){

    let location = window.location;
    console.log("location", location);

    let querystring = location.search;
    console.log("querystring", querystring);

    let urlParams = new URLSearchParams(querystring);
    console.log("url", urlParams);

    let id = urlParams.get("id");
    console.log("id ", id, typeof (id));

    let responses = await fetch(`/product/${id}`);
    console.log("responses : ",responses);

    let parsed_responses = await responses.json();
    console.log("parsed_ersponses : ",parsed_responses)

    let messages = parsed_responses.message;
    console.log("messages : ",messages);
  

    let rows = `
    <div class="container  lh-lg  pb-3 pt-3 shadow p-3 mb-5 bg-body rounded mt-3 mt-5">
      <div id = "imageid1" class="text-center" ><img  src ="${messages.image} "class = "single_datacontainerimg"></div>
                 <div id = "titleid1" class = "mt-3 fw-bold fs-1">Product : ${messages.name}</div>
                 <div id = "categoryid1" class="fst-normal fs-3">Price : ${messages.price}</div>
                 <div id = "ratingid1" class="fst-normal fs-3">Category : ${messages.category}</div>
                 <div id = "ratingid1" class="fst-normal fs-3">Rating : ${messages.rating}&#9734</div>
                 <div id = "ratingid1" class="fst-normal fs-3">Description : ${messages.description}</div>
                 <div class="ms-5 mt-2"><button onclick="EditClick('${id}')" class = "edit-button fs-5 fw-bold ps-3 pe-3">Edit</button></div>
                     
                 </div>
       </div>
    `
    document.getElementById('container').innerHTML = rows;

}

 function EditClick(id){
        window.location.href = `editpage.html?id=${id}`;
}

    async function formdata() {
        let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    let id = params.get('id')
    console.log("id from update data", id);


    let name = document.getElementById('name');
    let category = document.getElementById('category');
    let price = document.getElementById('price');
    let image = document.getElementById('image');
    let rating = document.getElementById('rating');
    let description = document.getElementById('description');


    try {
        let form_response = await fetch(`/product/${id}`);
        let form_parse_data = await form_response.json();
        let message = form_parse_data.message

        name.value = message.name
        category.value = message.category
        price.value = message.price
        image.value = message.image
        rating.value = message.rating
        description.value = message.description
    } catch (error) {
        image
        console.log("error : ", error)
    }
}

async function EditData(event){
    event.preventDefault();
    let name = document.getElementById('name').value
    console.log("name", name)
    let image = document.getElementById('image').value
    let price = document.getElementById('price').value
    let category = document.getElementById('category').value
    let rating = document.getElementById('rating').value
    let description = document.getElementById('description').value

    let datas1 = {
        name,
        price,
        image,
        category,
        rating,
        description,
    }

    
    let stringyfydata = JSON.stringify(datas1)
    console.log("stringyfydata", stringyfydata);

    let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    let id = params.get('id')
    console.log("id from update data", id);

    try {
        let response = await fetch(`/product/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringyfydata

        })
        let parsed_response = await response.json();
        console.log('parsed_response', parsed_response);

        window.location.href = `adminpage.html?id=${id}`

        if (parsed_response) {
            alert("Data Updated Successfully")
        }

    } catch (error) {
        console.log("error", error);
    }

}
async function DeleteClick(id) {
    let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    try {
        let deletedata = await fetch(`/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json"
            },
        })
        let parsed_deletedata = await deletedata.json();
        console.log("parsed_deletedata : ", parsed_deletedata);

        window.location.href = `update.html?id=${id}`

    } catch (error) {
        console.log("error", error);
    }
}