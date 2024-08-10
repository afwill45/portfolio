---
layout: ../../layouts/Article.astro
title: "genius"
pubDate: 2024-10-08
description: "Genius ios shortcut"
author: "Afolabi Williams"
tags: ["code, personal"]
---

# Genius ios shortcut

`Aug 2024`
`code`
`personal`

Shortly after ios 14 introducted widgets, new ios shortcuts were flying around reddit and I was eager to make one myself.

> A shortcut provides a quick way to get things done with your apps, with just a tap or by asking Siri. Shortcuts can automate a wide variety of things—for example, getting directions to the next event on your Calendar, moving text from one app to another, generating expense reports, and more. <br> You can use the Shortcuts app to add ready-made or custom shortcuts to your devices. The app lets you combine multiple steps across multiple apps to create powerful task automations.

Shortcuts are reminscent of workflow automation software like Notion or Jira, or simple programming representations like Scratch. 

> An action is the building block of a shortcut. Each shortcut comprises a series of actions, and each action is a single step that performs a particular function. For example, a shortcut that shares an animated GIF might contain three consecutive actions: Get Latest Photos grabs the latest photos that you took on your device, Make GIF uses those photos to build an animated GIF, and Send Message automatically sends the GIF to your recipients. 

I listen to a lot of music, and I love checking lyrics and their meanings on <genius.com>. 

But, while listening to a song, if I heard a lyric I wanted to look into, I would have to navigate to the genius webite → search up and select the song I'm listening to → scroll down to the lyric I want. Not only was this a bit tedious tens of times a day, in the time it took to do this, the song had probably moved on quite far.

So, I set out to build a shortcut that would make this process faster and easier. 

## Inital solution
I start by fetching the song and artist name from the music app and then then adding it directly to a genius url. I parse the names to match genius's url format and encode it directly into the url. Then I return the page the url returns.

![variable set](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/variable_set.webp)

>https://genius.com/artist_name-song_name-lyrics

You can try it out, replace artist_name and song_name with a song by an artist you know and it gets you the lyrics page for that song.

*Most* times. 

Sometimes, there are a few edge cases where the song and/or artist name fetched on apple music don't exactly correlate with the genius url for that song. 

For example the song 6:16 in LA by Kendrick Lamar gets parsed into:
    https://genius.com/Kendrick-lamar-6:16-in-la-lyrics instead of https://genius.com/Kendrick-lamar-6-16-in-la-lyrics.

## Adjusting for edge cases.
It quickly became clear I couldn't create special cases for every punctuation mark, and even if I did, some songs still just wouldn't match their genius url.

I needed a search algorithm. A way to provide the song information, and then receive the most likely match for that genius page. Thankfully, genius already has a search function. I could just feed the song information into the genius search url.

>https://genius.com/search?q=song_name-by-artist_name

It takes a bit of tweaking the format of the url to improve accuracy, but after a while I got pretty accurate search results. I would read the html content of the search results page, and extract and return the top result.

![web scraper](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/scraper.webp)

The minor innacuracy bothered me, but what bothered me far more, Genius' search was disturbingly slow.

## Optimizing for Speed
I needed a search algorithm that was more accurate and definitively faster. I need a search engine that can quickly search through genius pages, and get what I want. A quick and accurate search engine.

A no brainer. I sent my query through google specifying only the genius site. Leagues faster and far more accurate.
![shortcut with google capability](https://afolabitestbucket.s3.us-east-2.amazonaws.com/Image_test_folder/genius.webp)

Find the shortcut [here](https://www.icloud.com/shortcuts/71b49d36f2d24e738a173c9e8bf0f2d4)

The "programming" involved was of course wholly straightforward, but it was a fun way to engage in programming-esque thinking and problem solving without a care for syntax.