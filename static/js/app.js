// Read in the json file data
d3.json("../../data/samples.json").then((data) => {

    // Initialize arrays
    var values = [];
    var otu_ids = [];
    var otu_labels = [];
    var ids = [];

    // Sort the samples dataset by sample values
    var sortedValues = data.samples.sort((a,b) => b.sample_values - a.sample_values);
    console.log(sortedValues);

    // Slice the samples dataset into the top 10 values
    var slicedData = sortedValues.slice(0,10);
    console.log(slicedData);

    // IDS: EACH PERSON
    // Create two arrays for ids
    ids = sortedValues.map(d => d.id);
    console.log("---IDs---");
    console.log(ids);

    // SAMPLE VALUES: EACH SAMPLE
    // Create two arrays for values
    values = sortedValues.map(d => d.sample_values);
    top_10_values = sortedValues.map(d => d.sample_values.slice(0,10).reverse());
    console.log("---TOP 10 Values---");
    console.log(top_10_values[0]);

    // OTU IDS: EACH SAMPLE
    // Create two arrays for otu ids
    otu_ids = sortedValues.map(d => d.otu_ids);
    top_10_otu_ids = sortedValues.map(d => d.otu_ids.slice(0,10).reverse());
    console.log("---TOP 10 OTU IDs---");
    console.log(top_10_otu_ids[0]);

    // Initialize the string array for otu ids
    var string_otu_ids = [];
    
    // Function to convert numbers to string 
    function convertToString(x) {
        return `OTU ${String(x)}`;
    }

    // Loop through to convert int ids to strings (with OTU at beginning)
    for (var i = 0; i < top_10_otu_ids.length; i++) {
        string_otu_ids[i] = top_10_otu_ids[i].map(convertToString);
    };

    // STRING OTU IDS: EACH SAMPLE
    // Check string OTU ID array
    console.log("---TOP 10 String OTU IDs---");
    console.log(string_otu_ids[0]);

    // OTU LABELS: EACH SAMPLE
    // Create two arrays for otu labels
    otu_labels = sortedValues.map(d => d.otu_labels);
    top_10_otu_labels = sortedValues.map(d => d.otu_labels.slice(0,10).reverse());
    console.log("---TOP 10 OTU Labels---");
    console.log(top_10_otu_labels[0]);

    // METADATA DEMOGRAPHICS
    // Bring in the metadata object
    var metadata = data.metadata;
    console.log(metadata);

    // Define the id array
    var individual_id = metadata.map(d => d.id);
    console.log(individual_id);

    // Define the ethnicity array
    var ethnicity = metadata.map(d => d.ethnicity);
    console.log(ethnicity);

    // Define the gender array
    var gender = metadata.map(d => d.gender);
    console.log(gender);

    // Define the age array
    var age = metadata.map(d => d.age);
    console.log(age);

    // Define the location array
    var location = metadata.map(d => d.location);
    console.log(location);
    
    // Define the bbtype array
    var bbtype = metadata.map(d => d.bbtype);
    console.log(bbtype);

    // Define the wfreq array
    var wfreq = metadata.map(d => d.wfreq);
    console.log(wfreq);

    // DEMOGRAPHIC CARD
    // Select the card location
    card_list = d3.select("#list-group");
    
    // Append a list option with each demographic value
    card_list.append("li").text(`ID: ${individual_id[0]}`).attr("class", "list-group-item");
    card_list.append("li").text(`Ethnicity: ${ethnicity[0]}`).attr("class", "list-group-item");
    card_list.append("li").text(`Gender: ${gender[0]}`).attr("class", "list-group-item");
    card_list.append("li").text(`Age: ${age[0]}`).attr("class", "list-group-item");
    card_list.append("li").text(`Location: ${location[0]}`).attr("class", "list-group-item");
    card_list.append("li").text(`bbtype: ${bbtype[0]}`).attr("class", "list-group-item");
    card_list.append("li").text(`wfreq: ${wfreq[0]}`).attr("class", "list-group-item");

    // Initialize the graph when loaded with default data
    function init() {
    
        // Bar Plot trace
        var trace1 = [{
            x: top_10_values[0],
            y: string_otu_ids[0],
            text: top_10_otu_labels[0],
            type: "bar",
            orientation: "h",
            ids: string_otu_ids[0]
        }];

        // Bar Plot layout
        var layout1 = {
            title: "Top 10 OTU's Found",
            xaxis: {
                title: "Values"
            },
            yaxis: {
                title: "OTU IDs",
                type: "category"
            }
        };

        // Bubble Plot trace
        var trace2 = [{
            x: otu_ids[0],
            y: values[0],
            text: otu_labels[0],
            mode: 'markers',
            marker: {
                color: otu_ids[0],
                size: values[0]
            }
        }];
        
        // Bubble plot layout
        var layout2 = {
            title: 'Bacteria Cultures by Sample',
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: {
                title: "OTU ID"
            },
            yaxis: {
                title: "Sample Values",
                //type: "category"
            }
        };
        
        // Indicator Plot trace
        var trace3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq[0],
                title: { text: "Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 3 },
                gauge: {
                    bar: { color: 'blue' },
                    axis: { range: [0, 9] },
                    steps: [
                        { range: [0, 1], color: 'rgb(0, 162, 255)'},
                        { range: [1, 2], color: 'rgb(36, 172, 250)'},
                        { range: [2, 3], color: 'rgb(38, 176, 255)'},
                        { range: [3, 4], color: 'rgb(73, 185, 250)'},
                        { range: [4, 5], color: 'rgb(87, 191, 252)'},
                        { range: [5, 6], color: 'rgb(133, 206, 248)'},
                        { range: [6, 7], color: 'rgb(174, 218, 243)'},
                        { range: [7, 8], color: 'rgb(217, 241, 255)'},
                        { range: [8, 9], color: 'rgb(241, 247, 250)'}
                ],
                    threshold: {
                        line: { color: "darkblue", width: 4 },
                        thickness: 0.75,
                        value: wfreq[0]
                    }
                }
            }
        ];
        
        // Indicator Layout
        var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        

        
        // Define where the plots will live
        var bar_plot = d3.selectAll("#bar-plot").node();
        var bubble_plot = d3.selectAll("#bubble-plot").node();
        var indicator_plot = d3.selectAll("#indicator-plot").node();

        // Plot the plots
        Plotly.newPlot(bar_plot, trace1, layout1, {responsive: true});
        Plotly.newPlot(bubble_plot, trace2, layout2, {responsive: true});
        Plotly.newPlot(indicator_plot, trace3, layout3);
    
    };

    // DROPDOWN MENU
    // Select the dropdown menu
    var dropdownMenu = d3.select("#dropdown-menu>#selID");
    
    // Loop through ids and create options in dropdown menu
    for (var x = 0; x < ids.length; x++) {
        var option = dropdownMenu.append("option");
        option.text(ids[x]).attr("value", `${ids[x]}`);
    };

    // When the page is changed, update the plot
    d3.selectAll("select").on("change", updatePlotly);

    

// Function when a dropdown option is chosen
function updatePlotly() {
    var dataset = dropdownMenu.node().value;
    console.log(dataset);

    // Loop through ids to create cases (when each dataset is chosen)
    for (var i = 0; i < ids.length; i++) {
        switch(dataset) {
            case ids[i]:
                // Variables to change for Bar Plot
                x = top_10_values[i];
                y = string_otu_ids[i];
                text = top_10_otu_labels[i];

                // Variables to change for Bubble Plot
                x2 = otu_ids[i];
                y2 = values[i];
                text2 = otu_labels[i];
                break;
        };
    };

    // Loop through to change the demographic card
    for (var i = 0; i < individual_id.length; i++) {
        // if the dataset chosen is equal to the ID
        if (dataset == individual_id[i]) {
            // Set the ID iteration to a variable
            var thisID = i;

        // DEMOGRAPHIC CARD
        // Select the card location
        card_list = d3.select("#list-group");

        // Clear the demograhic card
        card_list.html("");
        
        // Append a list option with each demographic value
        card_list.append("li").text(`ID: ${individual_id[thisID]}`).attr("class", "list-group-item");
        card_list.append("li").text(`Ethnicity: ${ethnicity[thisID]}`).attr("class", "list-group-item");
        card_list.append("li").text(`Gender: ${gender[thisID]}`).attr("class", "list-group-item");
        card_list.append("li").text(`Age: ${age[thisID]}`).attr("class", "list-group-item");
        card_list.append("li").text(`Location: ${location[thisID]}`).attr("class", "list-group-item");
        card_list.append("li").text(`bbtype: ${bbtype[thisID]}`).attr("class", "list-group-item");
        card_list.append("li").text(`wfreq: ${wfreq[thisID]}`).attr("class", "list-group-item");
        };
    
    };

    // Select the location of each plot
    var bar_plot = d3.selectAll("#bar-plot").node();
    var bubble_plot = d3.selectAll("#bubble-plot").node();

    // Restyle the bar plot with new data
    Plotly.restyle(bar_plot, "x", [x]);
    Plotly.restyle(bar_plot, "y", [y]);
    Plotly.restyle(bar_plot, "text", [text]);

    // Restyle the bubble plot with new data
    Plotly.restyle(bubble_plot, "x", [x2]);
    Plotly.restyle(bubble_plot, "y", [y2]);
    Plotly.restyle(bubble_plot, "text", [text2]);

};

// Call the default plot
init();

});


