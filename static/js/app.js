// Read in the json file data
d3.json("../../data/samples.json").then((data) => {

    // Initialize arrays
    var values = [];
    var otu_ids = [];
    var otu_labels = [];
    var ids = [];


    var sortedValues = data.samples.sort((a,b) => b.sample_values - a.sample_values);
    console.log(sortedValues);
    var slicedData = sortedValues.slice(0,10);
    console.log(slicedData);
    // var reversedData = slicedData.reverse();
    // console.log(reversedData);

    // Create an array for ids
    // ids = data.samples.map(d => d.id);
    ids = sortedValues.map(d => d.id);
    console.log("---IDs---");
    console.log(ids);

     // Create an array for values
    values = sortedValues.map(d => d.sample_values);
    top_10_values = sortedValues.map(d => d.sample_values.slice(0,10).reverse());
    console.log("---Values---");
    console.log(top_10_values[0]);

     // Create an array for otu ids
    otu_ids = sortedValues.map(d => d.otu_ids);
    top_10_otu_ids = sortedValues.map(d => d.otu_ids.slice(0,10).reverse());
    console.log("---OTU IDs---");
    console.log(top_10_otu_ids[0]);

    // Initialize an array
    var string_otu_ids = [];
    
    // Loop through to convert int ids to strings
    for (var i = 0; i < top_10_otu_ids.length; i++) {
        string_otu_ids[i] = top_10_otu_ids[i].map(String);
    };
    console.log("---String OTU IDs---");
    console.log(string_otu_ids[0]);

     // Create an array for otu labels
    otu_labels = sortedValues.map(d => d.otu_labels);
    top_10_otu_labels = sortedValues.map(d => d.otu_labels.slice(0,10).reverse());
    console.log("---OTU Labels---");
    console.log(top_10_otu_labels[0]);

    // Initialize the graph when loaded with default data
    function init() {
    
        // Bar Plot
        var trace1 = [{
            x: top_10_values[0],
            y: string_otu_ids[0],
            text: top_10_otu_labels[0],
            type: "bar",
            orientation: "h"
        }];
    
        var layout1 = {
            title: `ID: ${ids[0]}`,
            xaxis: {
                title: "Values"
            },
            yaxis: {
                title: "OTU IDs",
                type: "category"
            }
        };

        // Bubble Plot
        var trace2 = [{
            x: otu_ids[0],
            y: values[0],
            text: otu_labels[0],
            mode: 'markers',
            marker: {
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
            size: values[0]
            }
        }];
        
        
        var layout2 = {
            title: 'Bubble Chart Hover Text',
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {
                title: "OTU ID"
            },
            yaxis: {
                title: "Sample Values",
                //type: "category"
            }
        };
        
        
        
        // Define where the plots will live
        var bar_plot = d3.selectAll("#bar-plot").node();
        var bubble_plot = d3.selectAll("#bubble-plot").node();

        // Plot the plots
        Plotly.newPlot(bar_plot, trace1, layout1);
        Plotly.newPlot(bubble_plot, trace2, layout2);
    
    };


    // Select the dropdown menu
    var dropdownMenu = d3.select("#selID");
    
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
    
    // Update the title for the plot
    var layout_update = {
        title: `ID: ${dataset}`,
        xaxis: {
                title: "Values"
            },
        yaxis: {
                title: "OTU IDs",
                type: "category"
            }
    };

    console.log(dataset);

    // Loop through ids to create cases
    for (var i = 0; i < ids.length; i++) {
        switch(dataset) {
            case ids[i]:
                x = values[i];
                y = string_otu_ids[i];
                text = otu_labels[i];
                break;
        };
    };

    var bar_plot = d3.selectAll("#bar-plot").node()

    Plotly.update(bar_plot, layout_update);
    Plotly.restyle(bar_plot, "x", [x]);
    Plotly.restyle(bar_plot, "y", [y]);
    Plotly.restyle(bar_plot, "text", [text]);
    

    console.log(dataset);

};
init();
});


