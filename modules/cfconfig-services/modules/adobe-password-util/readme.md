I am a utility for managing Adobe passwords for datasources and mail servers.  Normally, you won't need me, but sometimes you need to edit the config files directly.
	
# setSeedProperties()

Pass the path to the `seed.properties` file found in Adobe CF10+ which is neccessary to decrypt and encrypt passwords properly.  Do not use this for CF9.

# encryptDataSource()

Pass in a plain text password and receive the encrypted version back for a datasource.

# decryptDataSource()

Pass in an encrypted password and receive the plain text version back for a datasource.

# encryptMailServer()

Pass in a plain text password and receive the encrypted version back for a mail server.  This includes the "main" password as well as the keystore and cert passwords (if in use).

# decryptMailServer()

Pass in an encrypted password and receive the plain text version back for a mail server.  This includes the "main" password as well as the keystore and cert passwords (if in use).
