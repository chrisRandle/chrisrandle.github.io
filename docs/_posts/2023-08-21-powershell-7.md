---
layout: post
---

## Create User Profile Powershell 7

Review Profile Location
```
  echo $profile
```
- The path typically looks like this 'C:\Users\\<USER_NAME>\PowerShell\Microsoft.PowerShell_profile.ps1'

Verify if a profile already exists 
```
  test-path $profile
```

If not create a profile
```
  New-Item -Path $profile -Type File -Force
```

Open the blank profile using notepad or notepad++
```
  # Notepad
  start 'C:\WINDOWS\system32\notepad.exe' $profile

  # Notepad++
  start 'C:\Program Files\Notepad++\notepad++.exe' $profile
```

Now you have somewhere to 
- Set aliases
- Set default variables
- Import Modules 
- Load different paths and scripts

## Alias

### Built in aliases

To see built in aliases use the ```Get-Alias``` command. This is how microsoft replicates some of the awesome linux functionality like ls, cd, pwd and so on. The replication is not perfect as many of the commands do not behave when trying to add flags and filters.

### New Alias

Create a New Alias use the ```New-Alias``` command, the alias is temporary and only exists during the current powershell session, which is useful for testing but annoying to lose.

Example:

```
  New-Alias -Name tf -Value terraform.exe  
```

If your new alias works as expected save it to a [profile](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.3). The export-alias command can be used but it is a bit clunky and will add some header comments when adding the alias. Otherwiser you can just echo a set-alias command to your profile.

Export-Alias tf Example: 
```
  Export-Alias -Name tf -Path "$profile" -Append -As Script
```

Echo set-alias tf line Example:
```
  echo 'set-alias -Name:"tf" -Value:"terraform.exe" -Description:"" -Option:"None"' >> $profile 
```
- Double arrow '>>' is important otherwise will overwrite your $profile with this single alias.