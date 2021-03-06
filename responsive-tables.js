/**
 * Zurb Responsive Tables
 */
$(document).ready(function() {
    var switched = false;
    var selector = "table.responsive";
    var updateTables = function() {
        if (($(window).width() < 767) && !switched ){
            switched = true;
            $(selector).each(function(i, element) {
                splitTable($(element));
            });
            return true;
        }
        else if (switched && ($(window).width() > 767)) {
            switched = false;
            $(selector).each(function(i, element) {
                unsplitTable($(element));
            });
        }
    };
     
    $(window).load(updateTables);
    $(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
    $(window).on("resize", updateTables);
    
    function splitTable(original)
    {
        original.wrap("<div class='table-wrapper' />");
        
        var copy = original.clone();
        copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
        copy.add(original).find('caption').hide();
        copy.removeClass("responsive");
        
        original.closest(".table-wrapper").append(copy);
        copy.wrap("<div class='pinned' />");
        original.wrap("<div class='scrollable' />");

        setCellHeights(original, copy);
    }
    
    function unsplitTable(original) {
        original.closest(".table-wrapper").find(".pinned").remove();
        original.unwrap();
        original.unwrap();
    }

    function setCellHeights(original, copy) {
        var tr = original.find('tr'),
            tr_copy = copy.find('tr'),
            heights = [];

        tr.each(function (index) {
            var self = $(this),
                    tx = self.find('th, td');

            tx.each(function () {
                var height = $(this).outerHeight(true);
                heights[index] = heights[index] || 0;
                if (height > heights[index]) heights[index] = height;
            });
            
            $(this).height(heights[index]);

        });

        tr_copy.each(function (index) {
    		console.log('setting height',$(this)[0]);
            $(this).height(heights[index]);
        });
    }

});
