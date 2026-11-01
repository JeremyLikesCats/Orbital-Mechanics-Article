# Orbital Mechanics Article Plan
*inspired by Wang and Ricardo's Competitive Physics orbital mechanics chapter + Morin's book*

How do the planets in our universe move?

[[Graphic of the moon orbiting the earth]]

Let's go back in time to answer this question. We will be taking the path of going from Newton's Law of Gravitation, and seeing how this motivates *Kepler's 3 Laws*. (UPDATE THIS SECTION LATER TO SOUND MORE INTERESTING)

## Newton's Law of gravitation

*Newton's Law of gravitation* states that there is a *Force* between two particles that have mass, that pushes them towards each other.

[[Graphic of Newton's Law of gravitation working on two particles]]

Notice that the force between them gets much stronger as they get closer together.

In the simulation below, try to simulate the following:
- Make the particles twice as close to each other. What multiplier did the force increase by? (answer box)
- Make the particles thrice as close to each other. What multiplier did the force increase by? (answer box)

[[Gravitation law simulation - distance]]

Notice, that the amount the force change is proportional to the *square* of their distance. 

In the simulation below, try to simulate the following:
- Make one of the particles twice as heavy. What multiplier did the force increase by? (answer box)
- Make the other particle three times as heavy. What multiplier did the force increase by? (answer box)

[[Gravitation law simulation - mass]]

The force is also proportional to each of their masses!

Therefore, we can state the following:

(Newton's law of gravitation)
$$F = G m_1 m_2/r^2$$
 for some constant G, which we call the *gravitational constant*. It has a value of ..., which is *tiny*! This is good, because you don't want everything to suddenly get attracted to each other.

Newton's law of gravitation is what governs the movement of big planets. Using these laws, we are able to derive Kepler's 3 laws, which are extremely significant.

## Kepler's Laws

### Law 1
Planets travel around the sun in **elliptical** orbits.

[[Show simulation of planet orbiting sun in an ellipse]]

### Law 2
The area swept out by the planet over a period of time is constant.

[[Show simulation of areas being swept out by planet]]

### Law 3
The square of the planet's *time period* of orbit is directly proportional to the cube of its *semimajor axis*.

[[Show simulation with adjustable semimajor axis]]


(no time to finish)
## Conics

Here is a recap of conic sections.

A conic section, is what you get when you intersect a plane with a cone. 

[[Insert graphic of a plane inside a cone]]

There are three standard types of conic sections: an ellipse, a parabola, and a hyperbola. Each conic section has point(s) called the "foci", which have special properties.

The equation of a general conic section is, with respect to one focus:

$$r = \frac{p}{1 + e\cos{\theta}}.$$

[[Insert graphic of an ellipse with labelled values]]

$p$ is the length of the semilatus rectum (lol rectum), as shown above. $e$ is what we call the *eccentricity*, which is what uniquely determines the shape. $\theta$ is the angle relative to the line between a focus and its *periapsis*.

Here is a brief summary of the 3 types of conic sections:

### Ellipses

Ellipses are closed shapes defined to have an $e < 1$.

They can be expressed by the following formula:
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$$

The eccentricity of an ellipse can be represented by:

$$e = \frac{c}{a}$$
or
$$e = \sqrt{1 - \frac{b^2}{a^2}}$$

Its equation is:

$$r = \frac{a(1-e^2)}{1 + e\cos{\theta}}.$$

### Parabolas

Parabolas have the property that $e=1$.
They can be expressed by the following formula (for a parabola on the left side):

$y^2 = -4ax$.

Its equation is:
$$r = \frac{2a}{1 + \cos{\theta}}.$$

### Hyperbola

Hyperbolas have the property that $e>1$.

They can be expressed by the following formula:
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$$

Their eccentricities can be expressed by the following:
$$e = \sqrt{1 + \frac{a^2}{b^2}}$$
or
$$e = \frac{c}{a}$$

Its equation is:
$$r = \frac{a(e^2 - 1)}{1 + e\cos{\theta}}.$$

