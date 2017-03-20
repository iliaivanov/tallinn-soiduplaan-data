# Tallinn soidunplaan data fetcher
Simple node.js library to fetch Tallinn public transportation data.   

This library will fetch text-format data from soiduplaan.tallinn.ee and parse it using source javascript code (see lib/original-source).   

NB! On initial run may throw an error "Unhandled promise rejection (rejection id: 2): No cache file specified for stops" or something like this. Actually directory and files are created, but I messed something up with async code some this error is being throw for now. Temporary solution (Lol) will be to use _cachier.cacheDataFiles()_ before actually asking for data.
