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
    console.log(ids);

     // Create an array for values
    // values = data.samples.map(d => d.sample_values);
    values = sortedValues.map(d => d.sample_values.slice(0,10).reverse());
    console.log(values[0]);

     // Create an array for otu ids
    // otu_ids = data.samples.map(d => d.otu_ids);
    otu_ids = sortedValues.map(d => d.otu_ids.slice(0,10).reverse());
    console.log(otu_ids[0]);

     // Create an array for otu labels
    // otu_labels = data.samples.map(d => d.otu_labels);
    otu_labels = sortedValues.map(d => d.otu_labels.slice(0,10).reverse());
    console.log(otu_labels[0]);

    // Initialize the graph when loaded with default data
    function init() {
    
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
    console.log(dataset);
    
    for (var i = 0; i < ids.length; i++) {
        switch(dataset) {
            case ids[i]:
                x = values[i];
                y = `OTU ${otu_ids[i]}`;
                text = otu_labels[i];
                break;
        };

    };

    var layout_update = {
        title: dataset
    };

    var plot = d3.selectAll("#plot").node()


    Plotly.restyle(plot, "x", [x]);
    Plotly.restyle(plot, "y", [y]);
    Plotly.restyle(plot, "text", [text]);
    Plotly.update(plot, layout_update);

};
init();
});


