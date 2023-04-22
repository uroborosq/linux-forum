function applyPreloaderAnimation()
{
    // add nice page loading bar to the top of the page

    // this creating a bar object without any additional options
    const nanobar = new Nanobar();

    // every command sets progress of the bar to imitate loading
    nanobar.go( 30 );
    nanobar.go( 76 );
    nanobar.go(100);

}


