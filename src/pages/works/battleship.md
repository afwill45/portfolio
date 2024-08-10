---
layout: ../../layouts/Article.astro
title: "battleship"
pubDate: 2024-03-08
description: "Battleship AI program"
author: "Afolabi Williams"
tags: ["code"]
---

# battleship

`Aug 2024`
`code`

This program began as a midterm project for an introduction to AI college class. I and my friend, Chiron Phanbuh got to work with only one goal in mind. Make a program that can play Battleship.

> Battleship is a two player game where each player is in control of a fleet of ships. Each player is in control over a discrete board (i.e. a board with discrete coordinates), and both boards are the same size. Players place their ships one at a time on their board in secret: ships are allowed to touch but cannot overlap (i.e. they can be next to each other but not intersect). Once a player has finished placing their ships on their board, the ships cannot move afterwards. Finally, players take turns guessing coordinates on their opponents board. If the guessed square is occupied by a ship, that ship is “hit”. If all of the squares that a ship occupies are hit, that ship is sunk. The player who sinks their opponents entire fleet wins. <br> - Andrew Wood (Undisputed best CS Prof.)


![A gif of one of our battleship iterations in action, it sinks two of the opposing ships while its opponent sinks none](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/Untitled-ezgif.com-optimize.gif "Battleship gif")

## Initial Approach

The first approach we considered was a random search[^1]; guessing squares at random. We were supplied a default opponent to test our code against, and that was its strategy so we fought fire with fire.
- Average game length: 95.39 turns
- Minimum game length: 41 turns
- Maximum game length: 100 turns
![Random search graph](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/unnamed.webp "Random search graph")

```py
    def random_shot(self):
        while True:
            row, col = random.randint(0, self.size - 1), random.randint(0, self.size - 1)
            if (row, col) not in self.hits and (row, col) not in self.misses:
                return row, col
```

It plays battleship...
Of course, next we had to consider strategies so it could play battleship <b>well</b>

## Hunt and Target

Using the structure from the random search, this algorithm randomly guesses until it hits a ship. After which it checks the surrounding of every hit hoping to hit more.

- Average game length: 61.25 turns
- Minimum game length: 19 turns
- Maximum game length: 100 turns


![Hunt and target graph](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/Screenshot+2024-08-03+at+12.11.44%E2%80%AFAM.webp "Hunt and target graph")

```py
    for row in range(len(board)):
        for col in range(len(board[row])):
            if board[row][col] == 'hit':
                # Check above
                if row > 0 and board[row-1][col] == 'empty':
                    return (row-1, col)
                # Check below
                if row < len(board)-1 and board[row+1][col] == 'empty':
                    return (row+1, col)
                # Check left
                if col > 0 and board[row][col-1] == 'empty':
                    return (row, col-1)
                # Check right
                if col < len(board[row])-1 and board[row][col+1] == 'empty':
                    return (row, col+1)
```


## Parity

In a collaborative brainstorm with our friends [Isaac](https://www.linkedin.com/in/isaac-sin-43389629a/), [Ian](https://www.linkedin.com/in/vladimir-hakobyan-3448492a8/), and [Vladmir](https://www.linkedin.com/in/vladimir-hakobyan-3448492a8/). The concept of parity was brought up.

If the smallest ship takes up TWO squares, then in a board of a 100 squares you really only need to check (100/2) 50 of them. If the smallest ship took up FOUR squares, then you only need to check (100/4) 25 of them[^2]. By combining this with the hunt and target we get:

- Average game length: 52.92 turns
- Minimum game length: 17 turns
- Maximum game length: 75 turns


![Parity graph](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/unnamed-4.webp "Parity graph")

```py
    smallest_ship_size = 2
    for row in range(len(board)):
        for col in range(len(board[row])):
            if board[row][col] == 'empty' and (row + col) % smallest_ship_size == 0:
                return (row, col)
```

### Further Optimizations
 
 Intuitively most players recognize that if they get two hits in the same direction, they should keep checking that direction. When we apply that logic to our previous strategies we get:

 #### Optimized Hunt and Target
- Average game length: 59.61 turns
- Minimum game length: 17 turns
- Maximum game length: 100 turns

#### Optimized Hunt and Target w/ Parity
- Average game length: 51.87 turns
- Minimum game length: 17 turns
- Maximum game length: 73 turns




## Probability Search / Heat map
Finally, we arrived at the <b>Optimal Solution</b>[^4]. Most people intuitvely or strategically play with a strategy somewhere between hunt and target with parity and the regular hunt and parity. Our program can play battleship well. Now, we're going a step further.

We're going to consider every possible way every possible ship could occupy every possible square. And then we sum up these probabilities to understand the whole board.

Instead of guessing randomly, this method calculates the likelihood of each cell containing a ship and targets the cells with the highest probability. 

We ask every single cell; how likely is it that you have a ship? And we pick the cell that replies the highest number.

![Mathematical representation of our probability search solution](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/Screenshot+2024-08-03+at+3.33.23%E2%80%AFAM.webp "Probabiltiy search math representation")

We can represent this information as a heatmap. The lighter the square, the more likely it is that there is a ship. After every move, we update our calculations.

![Heat Map of 10x10 battleship grid](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/image.jpg "Heatmap grid")

This dramatically improves our average results to get[^3]:
- Average game length: 46.11 turns
- Minimum game length: 19 turns
- Maximum game length: 74 turns

![Probability search graph](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/unnamed-7.webp "Probability search graph")

```py
    max_prob = -1
    target = (-1, -1)
    for row in range(len(board)):
        for col in range(len(board[0])):
            if board[row][col] == 'empty' and probability_grid[row][col] > max_prob:
                max_prob = probability_grid[row][col]
                target = (row, col)
    
    return target
```
The four corners of the board start off with the lowest probabilities and so we artificially inflated them to catch any ships taking advantage of that fact. Here's a look at one of our iterations in action, winning in only 42 moves. 

Notice that every now and then the surroundings largely darken, that's when it's hit a ship and enters the targetting stage.

![Heatmap representation gif of a battleship game](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/heatmap_animation.gif "Heatmap game")

## Final Results

![Graph of every solution, probability search is the best while random search is the worst](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/unnamed-3.webp "Cumulative graph")

You can find an old iteration of our solution [here](https://github.com/afwill45/CS440-Battleship.git)

---

[^1]: This isn't the actual code used. All the code on this page are essentially pseudocode of an implementation.

[^2]: If you know the number of ships, you can keep track of ships sunk and adjust the "smallest_ship_size" number dynamically. You can also implement this backwards. E.g. Check every 5 spaces, and once all ships of size 5 sink, check every 4 spaces, and so and so forth.

[^3]: I discovered that these results are innacurate. It actually performs much better, with an average between 30 and 40 moves depending on implementation and a maximum game length of about 66 moves.

[^4]: This method is highly dependent on how you calculate probabilities. Our solution is optimal because we implement parity, direction optimization, and hunt and target into our calculations.
It can be further improved by using game theory or machine learning for non-random ship positions, but the figures on this post are all based on random positions.