Minimal Table Sorter
====================

This is a very small script to make HTML tables sortable using JavaScript. It
supports data of the following types:

  * strings
  * numbers
  * dates
  * currency ($)

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
          <h2>Tablesort Test</h2>
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

      // some data to put in the table dynamically
      var data = [
        [ 1, "small cat",   "$1.25" ],
        [ 2, "medium cat",  "$2.00" ],
        [ 3, "large cat",   "$3.50" ],
        [ 3, "x-large cat", "$3.50" ]
      ];

      // onload event handler
      $(function() {

          // the table
          var tbl = $("table.test");

          // append the data to the table
          tbl.append(
            $(data).map(function(i,item) {
              return $("<tr/>").append(
                $(this).map(function(i,item) {
                  return $("<td/>").text(item).get()[0];
                }).get()
              ).get();
            })
          );

          // bind "zebra stripes" function and make the table sortable
          tbl.bind('sort', function() {
              $("tbody > tr", this).not($("td table *", this)).each(
                function(i,item) {
                    $(this).removeClass(i % 2 ? "even" : "odd")
                           .addClass(i % 2 ? "odd" : "even");
                }
              );
          }).makeSortable();

      });

Things to Know
==============

  * The `th` elements need to have a `span` or something inside, or the
    `onclick` handler won't be set correctly.
  * When you dynamically add or remove rows from the table you can trigger 
    the `sort` event to cause the "zebra stripes" to rearrange themselves
    properly.
