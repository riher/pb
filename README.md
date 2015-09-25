# pb
Simple horizontal progress button js/css library
###Usage
- You create a progress button by creating a new "Pb" Object.

  <code>new Pb(buttonElement, percentage[, clicktrigger])</code>

  **buttonElement** is the DOM element that's going to be your button (preferably <button>)  
  **percentage** is the default width of the progress bar in relation to the button width (values 0-1)  
  **clicktrigger** optional, if set there will be a default onclick event listener to the button. 

  e.g. <code>button = new Pb(document.getElementById('button1'), 0.5, true)</code>

- If you haven't set **clicktrigger**, you'll have to trigger (=show the progress bar) the progress button manually.
  You do that by running the *trigger()* method on the button object.

  e.g. <code>button.trigger()</code>

  You can pass a different percentage value for the button for just one activation to *trigger()*.

- Use the *stop()* method to stop/remove the progress bar.

### Demo

  For a quick demo view <code>demo.html</code>.
