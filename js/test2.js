<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
        <script type='text/javascript' src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js'></script>
        
        <script type='text/javascript'></script>

$(document).ready(function() {
                    
    var options = {
        html: true,
        title: "Optional: HELLO(Will overide the default-the inline title)",
        //html element
        //content: $("#popover-content")
        content: $('[data-name="popover-content"]')
        //Doing below won't work. Shows title only
        //content: $("#popover-content").html()

    }
    var exampleEl = document.getElementById('example')
    
    var popover = new bootstrap.Popover(exampleEl, options)
})