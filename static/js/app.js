// Read in the json file data
d3.json("../../data/samples.json").then((data) => {

    var values = [];
    var labels = [];
    var hoverText = [];
    var ids = [];

    // Create an array for ids
    ids = data.samples.map(d => d.id);
    console.log(ids);

    // Create an array for values
    values = data.samples.map(d => d.sample_values);
    console.log(values[0]);

    

    for (var i = 0; i < data.samples.length; i++) {
        values.push(data['samples'][i]['sample_values'])
        labels.push(data['samples'][i]['otu_ids'])
        hoverText.push(data['samples'][i]['otu_labels'])
        

    // console.log(values[0]);

    var sortedByValues = data['samples'][i].map((a,b) => b['sample_values'] - a['sample_values']);
    var slicedData = sortedByValues.slice(0,10);
    var reversedData = slicedData.reverse();
};


    var trace1 = [{
        x: reversedData.map(object => object.sample_values),
        y: reversedData.map(object => object.otu_ids),
        text: reversedData.map(object => object.otu_labels),
        type: 'bar'

    }]

    // var trace1 = [{
    //     x: values[0],
    //     y: labels[0],
    //     text: hoverText[0],
    //     type: "bar",
    //     orientation: "h"
    // }];

    var layout1 = {
        title: ""
    };

    Plotly.newPlot("plot", trace1, layout1);


});