module.directive('entryVisualizationContent', function (Entries) {
    return {
        restrict: 'AEC',
        scope: {
            visualizationType:'@'
        },
        templateUrl: 'app/src/content/center/entry/entryVisualizationContent.tpl.html',
        replace: true,
        link: function (scope, element) {
            var graph = Entries.getEntriesRelationsNetwork();


            var findNode = function(id, nodes) {
                for (var i in nodes) {
                    if (nodes[i].id == id){
                        nodes[i].index = i;
                        return nodes[i];
                    }
                }

                return null;
            };

            var setNodes = function (link,nodes) {
                var source = findNode(link.source.id, nodes);
                var target = findNode(link.target.id, nodes);

                if(!source){
                    console.error("Invalid source " + link.source + " in relation with target " + link.target);
                }
                if(!target){
                    console.error("Invalid target " + link.target + " in relation with source " + link.source);
                }

                link.source = source;
                link.target = target;
            };

            graph.links.forEach(function(link){
                setNodes(link,graph.nodes);
            });

            //Constants for the SVG
            var width = 1000,
                height = 500;

            //Set up the colour scale
            var color = d3.scale.category20();


            //Append a SVG to the body of the html page. Assign this SVG as an object to svg
            var svg = d3.select(".uiks-visualisation").append("svg")
                .attr("width", '100%')
                .attr("height", height);



            var container = svg.append("g");
            //Create an array logging what is connected to what
            var linkedByIndex = {};

            container.append("g").attr("id", "links");
            container.append("g").attr("id", "nodes");
            var link = svg.select("#links").selectAll(".link");
            var node = svg.select("#nodes").selectAll(".node");

            var legendLeft = 10;
            var legendTop = 25;
            var boxWidth = 10;
            var legendSpacing = 25;
            var legend = svg.append("g")
                .attr("class", "legend")
                .attr("x", legendLeft)
                .attr("y", legendTop);

            var counter = 0;
            Entries.categories.forEach(function(category){
                if(category.id != "information"){
                    category.subCategories.forEach(function(subCategory){
                        legend.append("rect")
                            .attr("x", legendLeft)
                            .attr("y", legendSpacing*(counter+1))
                            .attr("width", boxWidth)
                            .attr("height", boxWidth)
                            .style("fill", function(d) { return color(subCategory.id); });

                        legend.append("text")
                            .attr("x", legendLeft+legendSpacing)
                            .attr("y", legendSpacing*(counter+1)+10)
                            .text(function(d) { return subCategory.title;});
                        counter++;
                    });
                }

            });

            var force = d3.layout.force();
            //Set up the force layout
            force.nodes(graph.nodes)
                .links(graph.links)
                .charge(-2000)
                .linkDistance(100)
                .linkStrength(1)
                .size([width, height]);

                //Restart the visualisation after any node and link changes
                scope.restart = function(nodes,links) {

                    link = link.data([]);
                    link.exit().remove();

                    node = node.data([]);
                    node.exit().remove();



                    force.nodes(nodes)
                        .links(links);

                    linkedByIndex = {};
                    for (i = 0; i < nodes.length; i++) {
                        linkedByIndex[i + "," + i] = 1;
                    }

                    links.forEach(function (link) {
                        linkedByIndex[link.source.index + "," + link.target.index] = 1;
                    });




                    link = link.data(links);
                    node = node.data(nodes);

                    link = link.data(links);
                    link.enter().insert("line")
                        .attr("class", "link")
                        .style("marker-end",  "url(#suit)")
                        .style("stroke-dasharray", function(element){
                            if(element.relation == "isA"){
                                return ("1, 0");
                            }
                            if(element.relation == "mayUse"){
                                return ("1, 4");
                            }
                            if(element.relation == "mustUse"){
                                return ("4, 2");
                            }
                            return("10,5");
                        });


                    var group = node.enter().append("g")
                        .attr("class", "node")
                        .call(force.drag)
                        .on('mouseenter', highlightNodes)
                        .on('mouseleave', unhighlightNodes);
                    group.insert("circle")
                        .attr("r", 8)
                        .style("fill", function (element) {
                            return color(element.category);
                        });
                    group.append("text")
                        .attr("dx", 10)
                        .attr("dy", ".35em")
                        .text(function(element) {
                            return element.title;
                        })
                        .style("stroke", "gray");

                    force.on("tick", function () {
                        link.attr("x1", function (d) {
                            return d.source.x;
                        })
                            .attr("y1", function (d) {
                                return d.source.y;
                            })
                            .attr("x2", function (d) {
                                return d.target.x;
                            })
                            .attr("y2", function (d) {
                                return d.target.y;
                            });

                        d3.selectAll("circle").attr("cx", function (d) {
                            return d.x;
                        }).attr("cy", function (d) {
                            return d.y;
                        });
                        d3.selectAll(".node").selectAll("text").attr("x", function (d) {
                            return d.x;
                        }).attr("y", function (d) {
                            return d.y;
                        });
                    });

                    force.start();


            };


            scope.threshold = function (thresh) {
                if(thresh === 0 || thresh === "0" ){
                    scope.restart(graph.nodes,graph.links);
                    return;
                }
                var newLinks = [];
                var stackLinks = [];
                var newNodes = [];
                var stackNodes = [];

                graph.links.forEach(function(link){
                    var add = false;
                    switch(thresh){
                        case "1":
                            add=true;
                            break;
                        case "2":
                            if(link.relation == "mustUse" || link.relation == "isA") {
                                add = true;
                            }
                            break;

                        case "3":
                            if(link.relation == "isA") {
                                add = true;
                            }
                            break;

                    }
                    if (add) {
                        stackLinks.push(jQuery.extend({}, link));
                        var source = findNode(link.source.id,graph.nodes);
                        if(!stackNodes[source.id]){
                            newNodes.push({
                                id: source.id,
                                title: source.title,
                                category: source.id
                            });
                            stackNodes[source.id] = true;
                        }

                        var target = findNode(link.target.id,graph.nodes);
                        if(!stackNodes[target.id]){
                            newNodes.push({
                                id: target.id,
                                title: target.title,
                                category: target.id
                            });
                            stackNodes[target.id] = true;
                        }
                    }
                });

                stackLinks.forEach(function(link){
                    setNodes(link,newNodes);
                    newLinks.push(link);
                });

                scope.restart(newNodes,newLinks);
            };
            scope.threshold(0);

            //Arrows
            svg.append("defs").selectAll("marker")
                .data(["suit", "licensing", "resolved"])
                .enter().append("marker")
                .attr("id", function(d) { return d; })
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 20)
                .attr("refY", 0)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
                .style("stroke", "#4679BD")
                .style("opacity", "0.6");





            //This function looks up whether a pair are neighbours
            function neighboring(a, b) {
                return linkedByIndex[a.index + "," + b.index];
            }
            function highlightNodes() {
                    //Reduce the opacity of all but the neighbouring nodes
                    d = d3.select(this).node().__data__;
                    node.transition().duration(1000).style("opacity", function (o) {
                        return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
                    });
                    link.transition().duration(1000).style("opacity", function (o) {
                        return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
                    });

            }
            function unhighlightNodes() {
                //Reduce the op
                toggle = 1;
                //Put them back to opacity=1
                node.transition().duration(500).style("opacity", 1);
                link.transition().duration(1000).style("opacity", 1);
                toggle = 0;
            }

            // create the zoom listener
            var zoomListener = d3.behavior.zoom()
                .scaleExtent([0.1, 3])
                .on("zoom", function(){
                    console.log( d3.event.translate[1]);
                    var newLegendTop = d3.event.translate[1];
                    var minTop = legendTop - d3.select('.legend').node().getBBox().height + Number(d3.select("svg").style("height").replace("px", ""))-50;
                    console.log(minTop);

                    if(newLegendTop > legendTop){
                        newLegendTop = legendTop;
                    }else if( newLegendTop < minTop){
                        newLegendTop = minTop;
                    }
                    legend.attr("transform","translate(" + [legendLeft,newLegendTop] + ")scale(" + 1 + ")");
                    container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                });


            // apply the zoom behavior to the svg image
            zoomListener(svg);

            /**
            var fisheye = d3.fisheye.circular()
                .radius(120);
            svg.on("mousemove", function() {
                force.stop();
                fisheye.focus(d3.mouse(this));
                d3.selectAll("circle").each(function(d) { d.fisheye = fisheye(d); })
                    .attr("cx", function(d) { return d.fisheye.x; })
                    .attr("cy", function(d) { return d.fisheye.y; })
                    .attr("r", function(d) { return d.fisheye.z * 8; });
                link.attr("x1", function(d) { return d.source.fisheye.x; })
                    .attr("y1", function(d) { return d.source.fisheye.y; })
                    .attr("x2", function(d) { return d.target.fisheye.x; })
                    .attr("y2", function(d) { return d.target.fisheye.y; });
            });**/
        }

    };
});
