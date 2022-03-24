1. Add the following to the `<head>` of your html file.
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sheerid/jslib@latest/sheerid.css" type="text/css" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/@sheerid/jslib@latest/metrics.js" crossorigin="anonymous"></script>
    ```

1. Add the SheerID JavaScript library in the `<body>`.
    ```html
    <script src="https://cdn.jsdelivr.net/npm/@sheerid/jslib@latest/sheerid.js" crossorigin="anonymous"></script>
    ```

1. Render the verification form in a `div`.
    ```html
    <div id="my-form"></div>
    <script>
        var sheerId = window.sheerId;
        sheerId.setOptions({logLevel: 'info'});

        // Create a program at my.sheerid.com
        var myProgramId = '<YOUR_PROGRAM_ID>';
        var myDiv = document.getElementById('my-form');
        var myForm = new sheerId.VerificationForm(myDiv, myProgramId);
    </script>
    ```
