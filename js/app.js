function startLap() {
    console.log(localStorage.lapDuration);

    var duration = localStorage.lapDuration.split( ':' ),
        time     = moment().add( 'minutes', duration[0] )
                           .add( 'seconds', duration[1] );

    $( '#laps span' ).html( + $( '#laps span' ).html() + 1 );

    $( 'body' ).removeClass( 'break' );

    $( '#breakTime' ).countdown( 'destroy' ); 
    $( '#lapTime' ).countdown( 'destroy' ); 

    $( '#lapTime' ).countdown( {
        format: 'MS',
        onExpiry: function() {
            startBreak();
        },
        until: time.toDate()
    } ); 

    $( '#pause' ).removeClass( 'hidden' );
}

function startBreak() {
    var duration = localStorage.breakDuration.split( ':' ),
        time     = moment().add( 'minutes', duration[0] )
                           .add( 'seconds', duration[1] );

    $( 'body' ).addClass( 'break' );

    $( '#breakTime' ).countdown( 'destroy' ); 
    $( '#lapTime' ).countdown( 'destroy' ); 

    $( '#breakTime' ).countdown( {
        format: 'MS',
        onExpiry: function() {
            startLap();
        },
        until: time.toDate()
    } ); 

    $( '#pause' ).removeClass( 'hidden' );
}

if ( localStorage.lapDuration.length ) {
    $( '#lapDuration input' ).val( localStorage.lapDuration );
} else {
    localStorage.lapDuration = $( '#lapDuration input' ).val();
}

if ( localStorage.breakDuration.length ) {
    $( '#breakDuration input' ).val( localStorage.breakDuration );
} else {
    localStorage.breakDuration = $( '#breakDuration input' ).val();
}

$( '#lapDuration input' ).blur( function() {
    localStorage.lapDuration = $( this ).val();
} );

$( '#breakDuration input' ).blur( function() {
    localStorage.breakDuration = $( this ).val();
} );


$( '#start' ).click( function() {

    $( this ).addClass( 'hidden' );
    $( '#reset' ).removeClass( 'hidden' );

    startLap();
} );

$( '#reset' ).click( function() {
    $( '#lapTime' ).countdown( 'destroy' ); 
    $( '#breakTime' ).countdown( 'destroy' ); 

    $( '#lapTime' ).html( "pain is weakness leaving the body" );

    $( this ).addClass( 'hidden' );

    $( '#pause' ).addClass( 'hidden' );

    $( '#start' ).removeClass( 'hidden' );

    $( 'body' ).removeClass( 'break' );

    $( '#laps span' ).html( '0' );
} );

$( '#pause').toggle( function() { 
        $( this ).html( 'resume' ); 

        if ( $( 'body' ).hasClass( 'break' ) ) {
            $( '#breakTime' ).countdown( 'pause' ); 
        } else {
            $( '#lapTime' ).countdown( 'pause' ); 
        }
    }, 
    function() { 
        $( this ).text( 'pause' ); 

        if ( $( 'body' ).hasClass( 'break' ) ) {
            $( '#breakTime' ).countdown( 'resume' ); 
        } else {
            $( '#lapTime' ).countdown( 'resume' ); 
        }
    } 
); 

