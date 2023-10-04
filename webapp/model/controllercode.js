sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("testptde2027.controller.View1", {
            onInit: function () {
                // Define and set up the f4Data model in your controller
                var oModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModel, "f4Data");

                // Load the data into the f4Data model
                this.loadF4Data();
            },
            loadF4Data: function () {
                var that = this;
                debugger;
                // Make a GET request to load data into the f4Data model
                this.getOwnerComponent().getModel().read("/Function_Location_EquipmentSet", {

                    success: function (oData) {
                        console.log(oData);
                        for (var j = 0; j < oData.results.length; j++) {
                            if (oData.results[j].Tplnr2 === "") {
                                oData.results[j].Tplnr2 = null;

                            }
                            oData.results[j].Counter = parseInt(oData.results[j].Counter);
                            oData.results[j].HierarchyLevel = parseInt(oData.results[j].HierarchyLevel);
                        }
                        console.log(oData);
                        that.getView().getModel("f4Data").setData(oData);
                        that.data = oData.results;
                        var aHeirarchies = that.returnHeirarchy(that.data);
                        console.log("aHeirarchies");
                        console.log(aHeirarchies);
                        const treeData = that.buildTree(oData.results, null);
                        console.log("treeData");
                        console.log(treeData);
                        that.getView().getModel("f4Data").setData(treeData);
                        //that.getView().getModel("f4Data").setData(oData);
                    },
                    error: function (oError) {
                        console.log(oError);
                    }
                });
            },

            returnHeirarchy: function (data) {
                var hierarchy0 = [];
                var hierarchy1 = [];
                var hierarchy2 = [];
                var hierarchy3 = [];
                var hierarchy4 = [];
                var hierarchy5 = [];
                var aheirarchies = [];
                for (var j = 0; j < data.length; j++) {
                    var item = data[j];
                    if (item.HierarchyLevel == '0000000000') {
                        hierarchy0.push(item);
                    } else if (item.HierarchyLevel == '0000000001') {
                        hierarchy1.push(item);
                    } else if (item.HierarchyLevel == '0000000002') {
                        hierarchy2.push(item);
                    } else if (item.HierarchyLevel == '0000000003') {
                        hierarchy3.push(item);
                    } else if (item.HierarchyLevel == '0000000004') {
                        hierarchy4.push(item);
                    } else if (item.HierarchyLevel == '0000000005') {
                        hierarchy5.push(item);
                    }

                }
                var oHeirarchies = {
                    hierarchy0: hierarchy0,
                    hierarchy1: hierarchy1,
                    hierarchy2: hierarchy2,
                    hierarchy3: hierarchy3,
                    hierarchy4: hierarchy4,
                    hierarchy5: hierarchy5
                }
                return oHeirarchies;
            },

            buildTree: function (data, parentID = null) {
                const tree = [];
                var that = this;

                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if (item.Tplnr2 === parentID) {
                        //const nodeId = item.Equnr ? item.Equnr : item.Tplnr1;
                        const children = that.buildTree(data, item.Tplnr1);
                        console.log(children);
                        /*  if(children.length>1){
                             debugger;
                             children.forEach(function (childItem) {
                                 childItem.Tplnr1=childItem.Equnr?childItem.Equnr:childItem.Tplnr1;
                             });
                         } */

                        const node = {
                            NodeID: item.Tplnr1,
                            Description: item.Pltxt,
                            Equnr: item.Equnr,
                            Eqktx: item.Eqktx,
                            children: children
                        };

                        tree.push(node);
                    }
                }

                return tree;
            }

        });
    });