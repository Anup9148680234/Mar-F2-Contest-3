const puppeteer = require('puppeteer');
const fs = require('fs');


const url = "https://github.com/trending";

const scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);

    console.log("First Extracting the Required Elements from each repos: ")

    var user_name = await page.evaluate(function() {
        var Main_List = Array.from(document.querySelectorAll(".Box-row > h1 > a"));
        
        var Extracted_list = []
       
        Main_List.forEach(function(li){
            var text = li.textContent.trim();
            // text.replaceAll("\n","");
            // text.replace('/'," ");
            var test_arr = text.split(" ");
            Extracted_list.push(test_arr[0]);
        });
        return Extracted_list;
    });
    console.log("User Name: " ,user_name);

    var rep_name = await page.evaluate(function() {
        var Main_List = Array.from(document.querySelectorAll(".Box-row > h1 > a"))
        
        var Extracted_list = []
       
        Main_List.forEach(function(li){
            var text = li.textContent.trim();
            // text.replaceAll("\n","");
            // text.replace('/'," ");
            var test_arr = text.split(" ");
            Extracted_list.push(test_arr[test_arr.length-1]);
        });
        return Extracted_list;
    });
    console.log("Repository Name: " ,rep_name);

    var description = await page.evaluate(function() {
        var Main_List = Array.from(document.getElementsByClassName('col-9 color-fg-muted my-1 pr-4'));
        
        var Extracted_list = []
       
        Main_List.forEach(function(li){
            var text = li.textContent;
            var test_arr = text.split(" ");
            var res = test_arr.slice(6,test_arr.length-4);
            var stri = res.join(" ");
            stri = stri.slice(0, stri.length-2);
            Extracted_list.push(stri);
            
        });
        return Extracted_list;
    });
    console.log("Description : " ,description);

    var rep_url = await page.evaluate(function() {
        var Main_List = Array.from(document.querySelectorAll(".Box-row > h1 > a"))
        
        var Extracted_list = []
       
        Main_List.forEach(function(li){
            
            var text = "https://github.com/"+li.getAttribute('href');
            Extracted_list.push(text);
        });
        return Extracted_list;
    });
    console.log("URL : " ,rep_url);

    var stars = await page.evaluate(function() {
        var Main_List = Array.from(document.getElementsByClassName('d-inline-block float-sm-right'));
        
        var Extracted_list = []
       
        Main_List.forEach(function(li){
            var text = li.textContent;
            var test_arr = text.split(" ");
            Extracted_list.push(test_arr[test_arr.length-3]);
        });
        return Extracted_list;
    });
    console.log("STARS : " ,stars);

    var forks = await page.evaluate(function() {
        var Main_List = Array.from(document.getElementsByClassName('Link--muted d-inline-block mr-3'));
        
        var Extracted_list = []
       
        Main_List.forEach(function(li){
            var text = li.textContent;
            var test_arr = text.split(" ");
            var res = test_arr[test_arr.length-1].replace("\n","");
            Extracted_list.push(res);
            
        });
        return Extracted_list;
    });
    console.log("Forks : " ,forks);

    var Programming_Language = await page.evaluate(function() {
        var Main_List = Array.from(document.getElementsByClassName('d-inline-block ml-0 mr-3'));
        
        var Extracted_list = []
       
        Main_List.forEach(function(li){
            var text = li.textContent;
            var test_arr = text.split(" ");
            var res = test_arr[test_arr.length-1].replace("\n","");
            Extracted_list.push(res);
            
        });
        return Extracted_list;
    });
    console.log("Programming Language : " ,Programming_Language);


    //Combining all traits to form a single string



    var combo_array = [];

    
    for(var i=0; i< user_name.length; i++){
        var total_data = {
            "User_name": "x",
            "title": "x",
            "description": "x",
            "url": "x",
            "stars": "x",
            "forks": "x",
            "language":"x"
        };

        total_data.User_name = user_name[i];
        total_data.title = rep_name[i];
        total_data.description = description[i];
        total_data.url = rep_url[i];
        total_data.stars = stars[i];
        total_data.forks = forks[i];
        total_data.language = Programming_Language[i];
        combo_array.push(total_data);
    }

    // console.log(combo_array);

    var final_data = {
        "repositories":"x"
    }

    final_data.repositories = combo_array;

    console.log(final_data);

    var json_final_data = "" + JSON.stringify(final_data, null , 2);
    fs.writeFileSync('./data.json',json_final_data);

   
    



    // await page.click('a[class="js-selected-navigation-item subnav-item"]'); 

    // await page.click('summary[class="select-menu-button btn-link"]'); 
    // await page.keyboard.type('input[class="form-control"]','javascript');
    // await page.keyboard.press('Enter');
    // click is not working bcoz class has white space and no id and no other correct attribute to reference above hence using goto
    // await page.goto('https://github.com/trending/developers/javascript?since=daily');


    
    
    await page.goto('https://github.com/trending/developers/javascript?since=daily');

    var Name_of_Developer = await page.evaluate(function() {
        var Main_List = Array.from(document.querySelectorAll(".Box > div > article > .d-sm-flex > div > div > h1 > a"))
        
        var Extracted_list = []
       
        Main_List.forEach(function(li){
            var text = li.textContent;
            text.replaceAll("\n"," ")
            var test_list = text.split(" ");
            var res = " " +  test_list[test_list.length-1];
            res = res.slice(0,res.length-2);
            Extracted_list.push(res.trim());
        });
        return Extracted_list;
    });
    console.log("Name of Developer" ,Name_of_Developer);

    var UserName_of_dev = await page.evaluate(function() {
        var Main_List = Array.from(document.querySelectorAll(".Box > div > article > .d-sm-flex > div > div > p > a"))
        
        var Extracted_list = []
       
        Main_List.forEach(function(li){
            var text = li.textContent;
            text.replaceAll("\n"," ")
            var test_list = text.split(" ");
            var res = " " +  test_list[test_list.length-1];
            res = res.slice(0,res.length-1);
            Extracted_list.push(res.trim());
        });
        return Extracted_list;
    });
    console.log("UserName of developer: " ,UserName_of_dev);

    var ReponameAndDescription = await page.evaluate(function() {
        var Main_List = Array.from(document.getElementsByClassName('css-truncate css-truncate-target'))
        
        var Extracted_list = []
       
        Main_List.forEach(function(li){
            var text = li.textContent;
            
            Extracted_list.push(text.trim());
            
        });
        Extracted_list.splice(0,4);
        return Extracted_list;
    });
    console.log("Repo Name & Description: " ,ReponameAndDescription);


    var final_combo = [];
    for(var i=0; i< Name_of_Developer.length; i++){
        var dev_data = {
            "Name_of_Developer": "x",
            "Username_of_Developer": "x",
            "Repo_Name_And_Description": "x"
        };
        dev_data.Name_of_Developer = Name_of_Developer[i];
        dev_data.Username_of_Developer = UserName_of_dev[i];
        dev_data.Repo_Name_And_Description = ReponameAndDescription[i];
        final_combo.push(dev_data);
    }

    var final_dev_data = {
        "JavaScript_Developers":"x"
    }

    final_dev_data.JavaScript_Developers = final_combo;

    console.log(final_dev_data);

    var json_dev_data = "" + JSON.stringify(final_dev_data, null , 2);
    fs.writeFileSync('./dev_data.json',json_dev_data);



}

scrape();



    

