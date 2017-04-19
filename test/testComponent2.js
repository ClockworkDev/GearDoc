CLOCKWORKRT.rendering.register("someProxyRenderingLibrary", {},"This is a proxy rendering library that does something with the events and the fowards them to the next library in the pipeline.");
//Get the previous pipeline
var pipeline =CLOCKWORKRT.rendering.getPipeline();
//And put the proxy at the start
pipeline.unshift("someProxyRenderingLibrary")
CLOCKWORKRT.rendering.setPipeline(pipeline);