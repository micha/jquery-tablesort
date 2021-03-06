Minimal Table Sorter
====================

This is a very small script to make HTML tables sortable using JavaScript. It
weighs in at about 1.2K, compressed but not packed. It's intended to be simple,
fast, and easy to use.

It supports sorting data of the following types:

  * strings
  * numbers
  * dates
  * currency ($)

Demo
====

Check out how it works on the [github project page](http://micha.github.com/jquery-tablesort/).

Usage
=====

This is a typical use-case:

_HTML_:

      <html>
        <head>
          <script type="text/javascript" src="jquery.js"></script>
          <script type="text/javascript" src="jquery.tablesort.js"></script>
        </head>
        <body>
          <h2>The Cat Store</h2>
          <table class="test" cellspacing="0" cellpadding="0">
            <colgroup>
              <col span="1" width="20%"/>
              <col span="1" width="40%"/>
              <col span="1" width="40%"/>
            </colgroup>
            <thead>
              <tr>
                <th><span>#</span></th>
                <th><span>description</span></th>
                <th><span>price</span></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </body>
      </html>

_CSS_:

      table.test > tbody > tr.even {
        background: #eef;
      }

      table.test > tbody > tr.odd {
        background: #fff;
      }

      table.test > thead > tr >th {
        cursor: pointer;
      }

_JavaScript_:

      // Data to put into the table dynamically.

      var data = [
        [ 1, "small cat",     "$1.25" ],
        [ 2, "medium cat",    "$2.00" ],
        [ 3, "large cat",     "$3.50" ],
        [ 4, "x-large cat",  "$35.50" ]
      ];

      // Function makes alternating "zebra stripes" on a table.

      function zebra(tbl) {
        $("tbody > tr", tbl).not($("td table *", tbl)).each(function(i,item) {
            var classes = [ "odd", "even" ];
            $(this).removeClass(classes[i%2]).addClass(classes[(i%2)+1]);
        });
      }

      // Function adds rows to a table with data from a 2-dimensional array.

      function appendToTable(tbl, data) {
        tbl.append($(data).map(function(i,item) {
            return $("<tr/>").append($(this).map(function(i,item) {
                return $("<td/>").text(item).get()[0];
            }).get()).get();
        }));
      }

      // Set the 'onload' event handler.

      $(function() {
      
          var tbl = $("table.test");
          appendToTable(tbl, data);

          // Bind "zebra stripes" function and make the table sortable.
          // The 'sort' event will be fired once when table is first made
          // sortable, and then whenever the table is re-sorted after that.

          tbl.bind('sort', function() { zebra(this) }).makeSortable();
      });

Things to Know
==============

  * The `th` elements need to have a `span` or something inside, or the
    `onclick` handler won't be set correctly.
  * When you dynamically add or remove rows from the table you can trigger 
    the `sort` event to cause the "zebra stripes" to rearrange themselves
    properly.
  * The ascending/descending state of each column is indicated by
    CSS classes that are applied to the table headings. Columns that are
    sorted in ascending order will have the class `sort-asc`, or the class
    `sort-desc` for descending.
  * The table itself is given the class `jquery-tablesort` so you can set
    up CSS for sortable tables separately, if you want.
