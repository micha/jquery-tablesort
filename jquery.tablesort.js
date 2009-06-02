(function($) {

  jQuery.fn.makeSortable = function() {
    var tbl = this;
    if (tbl.get()[0].tagName.toUpperCase() == "TABLE") {
      $("th > *", this)
        .each(function(col,colv) {
          $(this).click(function() { 
            var not  = tbl.find("td table *");
            var rows = tbl.find("tbody tr").not(not);
            var bak  = [], sort_as = null;
            rows.each(
              function(row, rowv) {
                var td = bak[row] = 
                  $(this).find("td").not(not).eq(col).text()+"";
                var type =  
                  (!isNaN(Date.parse(td)) ? "date" 
                    : (!isNaN(new Number(td)) ? "number" 
                      : (!isNaN(new Number(td.replace(/^\$/,""))) ? "currency" 
                        : "string")));
                sort_as = (!!sort_as && sort_as != type ? "string" : type);
              }
            );
            rows = rows.sort(function(a,b) {
              var va = $(a).find("td").not(not).eq(col).text();
              var vb = $(b).find("td").not(not).eq(col).text();
              if (sort_as == "date") {
                va = Date.parse(va);
                vb = Date.parse(vb);
                return (va < vb ? -1 : (va == vb ? 0 : 1));
              } else if (sort_as == "currency") {
                va = va.replace(/^\$/, "");
                vb = vb.replace(/^\$/, "");
                return (va - vb);
              } else if (sort_as == "number") {
                return (va - vb);
              } else if (sort_as == "string") {
                va = va.toString();
                vb = vb.toString();
                return (va < vb ? -1 : (va == vb ? 0 : 1));
              } else {
                return 0;
              }
            });
            if ((function() {
              for (var i=0; i<rows.size(); i++)
                if (rows.eq(i).find("td").not(not).eq(col).text() != bak[i])
                  return false;
              return true;
            })())
              rows = $(rows.get().reverse());
            tbl.find("tbody").not(not).append(rows);
            tbl.trigger('sort');
          });
        });
      tbl.trigger('sort');
    }
    return this;
  }

})(jQuery);
