/**
*	I am a utility for managing Adobe ColdFusion passwords for data sources and mail servers
*	I am not a singleton since I hold state (seed properties)
*/
component accessors='true' {

    property name='seed';
    property name='Algorithm';
    property name='wirebox' inject='wirebox';

	function init() {		
    	// Seed from the Adobe CF source.  Hard-coded in CF9, but dynamic on CF10+
		setSeed( '0yJ!@1$r8p0L@r1$6yJ!@1rj' );
    	setAlgorithm( 'DESede' );
    	return this;
	}
	
	// In CF10+ the seed and encryption algorithm can be different on each server.  This is so an encryted password by itself is useless
	// without the seed used encrypt it.  Read the current seen and algorithm from a properties file in the CF install home.
	function setSeedProperties( required string seedpropertiesPath ) {
		if( !fileExists( seedpropertiesPath ) ) {
			throw "Seed.properties file doesn't exist. Cannot decrypt passwords. [#seedpropertiesPath#]";
		}
		
		var propertyFile = wirebox.getInstance( 'PropertyFile@PropertyFile' )
			.load( seedpropertiesPath );
		
		setSeed( propertyFile.get( 'seed', '' ) );
    	setAlgorithm( propertyFile.get( 'algorithm', '' ) );
    	
    	return this;
	}
	

    public string function encryptDataSource( required string pass ) {
    	var secretKey = _generate3DesKey( seed );
		return encrypt( pass, secretKey, getAlgorithm(), "Base64");
    }

    public string function decryptDataSource( required string pass ) {
    	if( !len( pass ) ) { return ''; }
    	var secretKey = _generate3DesKey( seed );
    	try {
			return decrypt( pass, secretKey, getAlgorithm(), "Base64");
		} catch( any e ) {
			return 'ERROR DECRYPTING: [#e.message#]';
		}
    }	

	// Same as data source for now
    public string function encryptMailServer( required string pass ) {
		return encryptDataSource( pass );
    }

	// Same as data source for now
    public string function decryptMailServer( required string pass ) {
		return decryptDataSource( pass );
    }

	// **************************************************************************************************************
    // Internal private methods
	// **************************************************************************************************************
	
	// Adobe CF has this as a built-in function, but not Lucee. Credit to Paul Klinkenberg 
	// http://www.lucee.nl/post.cfm/cf-function-generate3deskey
	private function _generate3DesKey( string fromString ) {
		if( !structKeyExists( arguments, 'fromString' ) ){
			return generateSecretKey( 'DESEDE' );
		}
		var secretKeySpec = createObject( 'java', 'javax.crypto.spec.SecretKeySpec' ).init( arguments.fromString.getBytes(), getAlgorithm() );
		return toBase64( secretKeySpec.getEncoded() );
	}
}


