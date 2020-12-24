uniform float time;
uniform float progress;
uniform float distanceFromCenter;
uniform sampler2D texture1;
uniform vec4 resolution;
float PI = 3.141592;
varying vec2 vUv;
varying vec3 vPosition;

void main()	{
vec4 t = texture2D(texture1, vUv);
	gl_FragColor = t;
	gl_FragColor.a = clamp(distanceFromCenter,0.2,1.);
}