function startRound() {
    var duration = localStorage.roundDuration.split( ':' ),
        time     = moment().add( 'minutes', duration[0] )
                           .add( 'seconds', duration[1] );

    $( '#rounds span' ).html( + $( '#rounds span' ).html() + 1 );

    $( 'body' ).removeClass( 'break' );

    $( '#breakTime' ).countdown( 'destroy' ); 
    $( '#roundTime' ).countdown( 'destroy' ); 

    $( '#roundTime' ).countdown( {
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
    $( '#roundTime' ).countdown( 'destroy' ); 

    $( '#breakTime' ).countdown( {
        format: 'MS',
        onExpiry: function() {
            startRound();
        },
        until: time.toDate()
    } ); 

    $( '#pause' ).removeClass( 'hidden' );
}

if ( localStorage.roundDuration ) {
    $( '#roundDuration input' ).val( localStorage.roundDuration );
} else {
    localStorage.roundDuration = $( '#roundDuration input' ).val();
}

if ( localStorage.breakDuration ) {
    $( '#breakDuration input' ).val( localStorage.breakDuration );
} else {
    localStorage.breakDuration = $( '#breakDuration input' ).val();
}

$( '#roundDuration input' ).blur( function() {
    localStorage.roundDuration = $( this ).val();
} );

$( '#breakDuration input' ).blur( function() {
    localStorage.breakDuration = $( this ).val();
} );


$( '#start' ).click( function() {

    $( this ).addClass( 'hidden' );
    $( '#reset' ).removeClass( 'hidden' );

    startRound();
} );

$( '#reset' ).click( function() {
    $( '#roundTime' ).countdown( 'destroy' ); 
    $( '#breakTime' ).countdown( 'destroy' ); 

    $( '#roundTime' ).html( "pain is weakness leaving the body" );

    $( this ).addClass( 'hidden' );

    $( '#pause' ).addClass( 'hidden' );

    $( '#start' ).removeClass( 'hidden' );

    $( 'body' ).removeClass( 'break' );

    $( '#rounds span' ).html( '0' );
} );

$( '#pause').toggle( function() { 
        $( this ).html( 'resume' ); 

        if ( $( 'body' ).hasClass( 'break' ) ) {
            $( '#breakTime' ).countdown( 'pause' ); 
        } else {
            $( '#roundTime' ).countdown( 'pause' ); 
        }
    }, 
    function() { 
        $( this ).text( 'pause' ); 

        if ( $( 'body' ).hasClass( 'break' ) ) {
            $( '#breakTime' ).countdown( 'resume' ); 
        } else {
            $( '#roundTime' ).countdown( 'resume' ); 
        }
    } 
); 

