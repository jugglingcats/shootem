(function () {
    var inc={
        t: 1,
        b: 1
    };

    var top = 10;
    var bottom = 5;

    var bird;
    var wall;

    var mainState = {
        preload: function () {
            game.load.image('bird', 'assets/bird.png');
            game.load.image('brick', 'assets/brick.png');
        },

        create: function () {
            game.stage.backgroundColor = '#71c5cf';
            game.physics.startSystem(Phaser.Physics.ARCADE);

            bird = game.add.sprite(100, 245, 'bird');

            game.physics.arcade.enable(bird);

            bird.body.gravity.y = 800;

            var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.add(function() {
                bird.body.velocity.y = -250;
            }, this);

            wall = game.add.group();

            game.time.events.loop(25, this.generateWall, this);
        },

        update: function () {
            if (bird.y < 0 || bird.y > 490) {
                game.state.start('main');
            }
        },

        addOneBrick: function (x, y) {
            var brick = game.add.sprite(x, y, 'brick');

            wall.add(brick);

            game.physics.arcade.enable(brick);

            brick.body.velocity.x = -200;

            brick.checkWorldBounds = true;
            brick.outOfBoundsKill = true;
        },

        nextBrick: function(val, name, min, max) {
            var next = val + inc[name];
            if (next < min) {
                next = min;
                inc[name] = -inc[name];
            } else if (next > max) {
                next = max;
                inc[name] = -inc[name];
            } else if (Math.random() > 0.7) {
                inc[name] = -inc[name];
            }
            return next;
        },

        generateWall: function () {
            for (var i = 0; i < top; i++) {
                this.addOneBrick(800, i * 8);
            }

            for (var j = 0; j < bottom; j++) {
                this.addOneBrick(800, 400 - j * 8);
            }

            top=this.nextBrick(top, 't', 0, 16);
            bottom=this.nextBrick(bottom, 'b', 0, 16);
        }
    };

    var game = new Phaser.Game(800, 400);
    game.state.add('main', mainState, true);
})();

