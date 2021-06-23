// Read in the json file data
d3.json("../../data/samples.json").then((data) => {

    // Initialize arrays
    var values = [];
    var otu_ids = [];
    var otu_labels = [];
    var ids = [];

    var sortedValues = data.samples.map((a,b) => b.sample_values - a.sample_values);
    console.log(sortedValues);
    var slicedData = sortedValues.slice(0,10);
    var reversedData = slicedData.reverse();

    // Create an array for ids
    ids = data.samples.map(d => d.id);
    // console.log(ids);

     // Create an array for values
    values = data.samples.map(d => d.sample_values);
    // console.log(values[0]);

     // Create an array for otu ids
    otu_ids = data.samples.map(d => d.otu_ids);
    // console.log(otu_ids[0]);

     // Create an array for otu labels
    otu_labels = data.samples.map(d => d.otu_labels);
    // console.log(otu_labels[0]);

    // Initialize the graph when loaded with default data
    function init() {
        var trace1 = [{
            x: values[0].slice(0,10),
            y: reversedData.map(object => object.otu_ids),
            text: reversedData.map(object => object.otu_labels),
            type: 'bar'
    
        }]
    
        var trace1 = [{
            x: values[0],
            y: `OTU ${otu_ids[0]}`,
            text: otu_labels[0],
            type: "bar",
            orientation: "h"
        }];
    
        var layout1 = {
            title: ids[0]
        };
    
        var plot = d3.selectAll("#plot").node()

        Plotly.newPlot(plot, trace1, layout1);
    
    
    };

    // Select the dropdown menu
    var dropdownMenu = d3.select("#selID");
    
    // Loop through ids and create options in dropdown menu
    for (var x = 0; x < ids.length; x++) {
        var option = dropdownMenu.append("option");
        option.text(ids[x]).attr("value", `${ids[x]}`);
    };

    d3.selectAll("select").on("change", updatePlotly);

// Function when a dropdown option is chosen
function updatePlotly() {
    var dataset = dropdownMenu.node().value;
    
    for (var i = 0; i < ids.length; i++) {
        switch(dataset) {
            case ids[i]:
                x = values[i];
                y = `OTU ${otu_ids[i]}`;
                text = otu_labels[i];
                break;
        };

        var update = {
            title: ids[i]
        };
};

    d3.selectAll("option").on("click", function() {
        var chosenOption = d3.select(this).text();
        console.log(chosenOption);
    });


    var plot = d3.selectAll("#plot").node()

    // var update = {
    //     title: ids[i]
    // }

    Plotly.restyle(plot, "x", [x]);
    Plotly.restyle(plot, "y", [y]);
    Plotly.restyle(plot, "text", [text]);
    Plotly.restyle(plot, update);


    // 



};
init();
});


