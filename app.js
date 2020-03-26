// Copyright 2020 Bhautik
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



function isDarkMode() {
    isDark = localStorage.getItem("dark");
    if(isDark) {
        // previous value is set
        if(isDark == "true") {
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute("content", "#121212");
            document.body.setAttribute("dark", true);
            return true
        }
        else {
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute("content", "#F1F3F6");
            document.body.setAttribute("dark", false);
            return false
        }
    }
    else {
        localStorage.setItem("dark", "false")
        document.body.setAttribute("dark", false);
    }
}

isDarkMode()

document.querySelector("#mode").addEventListener("click", (e) => {
    e.preventDefault()
    if(isDarkMode()) {
        // set to light
        localStorage.setItem("dark", "false");
        document.body.setAttribute("dark", false);
        document
            .querySelector('meta[name="theme-color"]')
            .setAttribute("content", "#F1F3F6");
    }
    else {
        localStorage.setItem("dark", "true");
        document.body.setAttribute("dark", true);
        document
            .querySelector('meta[name="theme-color"]')
            .setAttribute("content", "#121212");
    }
})


document.addEventListener("DOMContentLoaded", (e) => {
    fetch(
        "https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/rest/services/Cases_by_country_pt_V3/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=cum_conf%20desc&resultOffset=0&resultRecordCount=145&cacheHint=true"
    ).then(res => res.json())
    .then((jsonData) => {
        data = jsonData;
        indiaData = data.features.filter(
            country => country.attributes.ADM0_NAME == "India"
        );
        confirmCases = indiaData[0].attributes.cum_conf;
        deaths = indiaData[0].attributes.cum_death;
        document.querySelector("#loading-data").style="display:none";
        document.querySelector("#show").classList.remove("loading");
        document.querySelector("#case-count").innerHTML = confirmCases;
        document.querySelector("#deaths-count").innerHTML = deaths;
    })
    .catch((err) => {
        alert("Your are offline!!");
        window.location.reload();
    })
});
