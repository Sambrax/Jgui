imports.searchPath.unshift("../../");
imports.jgui;

class Piano {

    _init() {
        $.url = "http://localhost:8000";
        $.include("/style.min.css");
        $.request("/", function (response) {
            $.builder(response, "window");
        });
    }

    onDeleteWindow() {
        $.quit();
    }

    playSound(button) {
        let Gst  = imports.gi.Gst,
            freq = { // Frequency
              C: 261.63,
              D: 293.66,
              E: 329.63,
              F: 349.23,
              G: 391.99,
              A: 440.00,
              B: 493.88};

        Gst.init(null);

        let pipeline = new Gst.Pipeline({name: "note"}),
            source   = Gst.ElementFactory.make("audiotestsrc","source"),
            sink     = Gst.ElementFactory.make("autoaudiosink","output");

        source.set_property("freq", freq[button.label]);
        pipeline.add(source);
        pipeline.add(sink);
        source.link(sink);
        pipeline.set_state(Gst.State.PLAYING);

        $.mainloop.timeout_add(500, function () {
            pipeline.set_state(Gst.State.NULL);
            return false;
        });
    }
}

$.define(Piano);
