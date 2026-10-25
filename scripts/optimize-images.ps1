param([string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$outputDirectory = Join-Path $ProjectRoot 'public/images/optimized'
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
$assets = @(
  @{ Source = 'public/images/personal-images/personal_image.JPG'; Name = 'portrait.jpg'; Width = 640 },
  @{ Source = 'public/images/competitions-certifications/EPICS8/689475088_122127824871169933_4345988501750093972_n.jpg'; Name = 'aquaguard-team.jpg'; Width = 960 },
  @{ Source = 'public/images/competitions-certifications/EPICS8/HCMUT - AquaGuard_page-0001.jpg'; Name = 'epics-certificate.jpg'; Width = 720 },
  @{ Source = 'public/images/competitions-certifications/OPC25/First Prize_AquaGuardian_page-0001.jpg'; Name = 'oisp-certificate.jpg'; Width = 720 },
  @{ Source = 'public/images/competitions-certifications/EPICS8/HCMUT - AquaGuard_Nghia_page-0001.png'; Name = 'epics-personal-certificate.jpg'; Width = 720 },
  @{ Source = 'public/images/competitions-certifications/OPC25/Golden Ticket_AquaGuardian_page-0001.png'; Name = 'oisp-golden-ticket.jpg'; Width = 720 }
)
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
foreach ($asset in $assets) {
  $original = [System.Drawing.Image]::FromFile((Join-Path $ProjectRoot $asset.Source))
  $height = [int][Math]::Round($original.Height * $asset.Width / $original.Width)
  $bitmap = New-Object System.Drawing.Bitmap($asset.Width, $height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
  try {
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($original, 0, 0, $asset.Width, $height)
    $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)
    $bitmap.Save((Join-Path $outputDirectory $asset.Name), $encoder, $parameters)
  } finally {
    $parameters.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
    $original.Dispose()
  }
}
Get-ChildItem -LiteralPath $outputDirectory | Select-Object Name, Length
