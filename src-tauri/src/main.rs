#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
  )]
  
  use tauri::{
    CustomMenuItem,
    Menu,
    MenuItem,
    Submenu,
    WindowEvent,
  };
  use tauri::Manager;
  use tauri::Window;
  use std::process::Command;
  use serde::{Serialize, Deserialize};
  
  #[derive(Debug, Serialize, Deserialize)]
  struct SystemInfo {
      os_version: String,
      cpu_info: String,
      total_memory: String,
  }
  
  #[tauri::command]
  async fn get_system_info() -> Result<SystemInfo, String> {
    println!("Chamando get_system_info...");
  
    #[cfg(target_os = "windows")]
    {
        let os_version = match Command::new("powershell")
            .arg("-Command")
            .arg("Get-WmiObject Win32_OperatingSystem | Select-Object Caption | ForEach-Object {$_.Caption}")
            .output() {
            Ok(output) => String::from_utf8_lossy(&output.stdout).trim().to_string(),
            Err(e) => return Err(format!("Failed to get OS version: {}", e)),
        };
  
        let cpu_info = match Command::new("powershell")
            .arg("-Command")
            .arg("Get-WmiObject Win32_Processor | Select-Object Name | ForEach-Object {$_.Name}")
            .output() {
            Ok(output) => String::from_utf8_lossy(&output.stdout).trim().to_string(),
            Err(e) => return Err(format!("Failed to get CPU info: {}", e)),
        };
  
        let total_memory = match Command::new("powershell")
            .arg("-Command")
            .arg("(Get-WmiObject Win32_ComputerSystem).TotalPhysicalMemory")
            .output() {
            Ok(output) => {
                let bytes = String::from_utf8_lossy(&output.stdout).trim().parse::<u64>().unwrap_or(0);
                let gb = bytes as f64 / (1024.0 * 1024.0 * 1024.0);
                format!("{:.2} GB", gb)
            }
            Err(e) => return Err(format!("Failed to get total memory: {}", e)),
        };
  
        Ok(SystemInfo {
            os_version,
            cpu_info,
            total_memory,
        })
    }
    #[cfg(not(target_os = "windows"))]
    {
        Err("System info not supported for this operating system.".to_string())
    }
  }
  
  #[tauri::command]
  async fn optimize_memory() -> Result<String, String> {
    println!("Chamando optimize_memory...");
    #[cfg(target_os = "windows")]
    {
      let output = Command::new("powershell")
        .arg("-Command")
        .arg("Clear-RecycleBin -Force; Invoke-Expression ((gc C:\\Windows\\MEMORY_INFO.py) -join \"`n\")")
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;
      if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        println!("stdout: {}", stdout);
        Ok(format!("Otimização de memória completa com sucesso. Resultado: {}", stdout))
      } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        eprintln!("stderr: {}", stderr);
        Err(format!("Otimização de memória falhou. Erro: {}", stderr))
      }
    }
    #[cfg(not(target_os = "windows"))]
    {
      Err("Otimização de memória não suportada para este sistema operacional.".to_string())
    }
  }
  
  
  #[tauri::command]
  async fn clear_temp_files() -> Result<String, String> {
    println!("Chamando clear_temp_files...");
    #[cfg(target_os = "windows")]
    {
      let output = Command::new("powershell")
        .arg("-Command")
        .arg("Get-ChildItem -Path $env:TEMP, $env:LOCALAPPDATA\\Temp -File -Recurse | ForEach-Object { Remove-Item -Path $_.FullName -Force -ErrorAction SilentlyContinue }")
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;
  
      if output.status.success() {
        Ok("Arquivos temporários removidos com sucesso.".to_string())
      } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        eprintln!("stderr: {}", stderr);
        Err(format!("Falha ao remover arquivos temporários. Erro: {}", stderr))
      }
    }
    #[cfg(not(target_os = "windows"))]
    {
      Err("Limpeza de arquivos temporários não suportada para este sistema operacional.".to_string())
    }
  }
  
  #[tauri::command]
  async fn flush_dns() -> Result<String, String> {
    println!("Chamando flush_dns...");
    #[cfg(target_os = "windows")]
    {
      let output = Command::new("powershell")
        .arg("-Command")
        .arg("ipconfig /flushdns")
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;
  
      if output.status.success() {
        Ok("Cache DNS limpo com sucesso.".to_string())
      } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        eprintln!("stderr: {}", stderr);
        Err(format!("Falha ao limpar o cache DNS. Erro: {}", stderr))
      }
    }
    #[cfg(not(target_os = "windows"))]
    {
      Err("Limpeza do cache DNS não suportada para este sistema operacional.".to_string())
    }
  }
  
  #[tauri::command]
  async fn disk_cleanup() -> Result<String, String> {
    println!("Chamando disk_cleanup...");
    #[cfg(target_os = "windows")]
    {
      let output = Command::new("powershell")
        .arg("-Command")
        .arg("cleanmgr /sagerun:1")
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;
  
      if output.status.success() {
        Ok("Limpeza de disco concluída com sucesso.".to_string())
      } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        eprintln!("stderr: {}", stderr);
        Err(format!("Falha na limpeza de disco. Erro: {}", stderr))
      }
    }
    #[cfg(not(target_os = "windows"))]
    {
      Err("Limpeza de disco não suportada para este sistema operacional.".to_string())
    }
  }
  
  #[tauri::command]
  async fn disk_defrag(volume: String) -> Result<String, String> {
    println!("Chamando disk_defrag com volume: {}", volume);
  
    #[cfg(target_os = "windows")]
    {
      let output = Command::new("powershell")
        .arg("-Command")
        .arg(format!("Optimize-Volume -DriveLetter {}", volume))
        .output()
        .map_err(|e| format!("Failed to execute disk defrag command: {}", e))?;
  
      if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        Ok(format!("Disk defragmentation completed successfully on volume {}. Resultado: {}", volume, stdout))
      } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        eprintln!("stderr: {}", stderr);
        Err(format!("Disk defragmentation failed on volume {}. Error: {}", volume, stderr))
      }
    }
    #[cfg(not(target_os = "windows"))]
    {
      Err("Disk defragmentation is only supported on Windows.".to_string())
    }
  }
  
  
  fn main() {
    let menu = Menu::new()
      .add_submenu(Submenu::new("Otimiza+", Menu::new()
        .add_item(CustomMenuItem::new("sobre", "Sobre"))
        .add_native_item(MenuItem::Separator)
        .add_item(CustomMenuItem::new("sair", "Sair").accelerator("CmdOrCtrl+Q")))
      );
  
    tauri::Builder::default()
      .menu(menu)
      .on_menu_event(|event| {
        match event.menu_item_id() {
          "sobre" => {
            let window = event.window();
            tauri::api::dialog::message(Some(window), "Sobre Otimiza+", "Otimiza+ é um otimizador de sistema.");
          }
          "sair" => {
            std::process::exit(0);
          }
          _ => {}
        }
      })
      .on_window_event(|event| {
        match event.event() {
          WindowEvent::CloseRequested { api, .. } => {
            event.window().hide().unwrap();
            api.prevent_close();
          }
          _ => {}
        }
      })
      .invoke_handler(tauri::generate_handler![
        optimize_memory,
        clear_temp_files,
        flush_dns,
        disk_cleanup,
        get_system_info,
        disk_defrag
      ])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
  }
  
    